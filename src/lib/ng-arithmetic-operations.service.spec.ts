import { TestBed, inject, async } from '@angular/core/testing';
import { NgArithmeticOperationsService } from './ng-arithmetic-operations.service';
import { ErrorCode, Sign, ConvertOperator, ConvertSign, Operator } from './const';

export interface ErrorMsg {
  code: string;
  msg: string;
}

describe('NgArithmeticOperationsService', () => {
  let service: NgArithmeticOperationsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgArithmeticOperationsService]
    });
  });

  beforeEach(inject([NgArithmeticOperationsService], s => {
    service = s;
  }));

  it('should be created', async(() => {
    expect(service).toBeTruthy();
  }));

  it('should test isNumber() and return boolean', async(() => {
    let res: boolean;
    let testCase = ['s', '5', '2', '.', '>', '&', '~', 'w', '0', '-5'];

    spyOn(service, 'isNumber').and.returnValue(res);

    for (let i = 0; i < testCase.length; i++) {
      expect(service.isNumber(testCase[i])).toEqual(res);
    }
  }));

  it('should test inputKey(), if the input is illegal then return function', async(() => {
    spyOn(service, 'inputKey').and.returnValue(undefined);

    expect(service.inputKey('XXX')).toEqual(undefined);
  }));

  it('should test inputKey, if the input is ., go to combineNumber', async(() => {
    spyOn(service, 'combineNumber');
    service.inputKey(Sign.DOT);
    expect(service.combineNumber).toHaveBeenCalled();
  }));

  it('should test inputKey, if the input is number, go to combineNumber', async(() => {
    spyOn(service, 'combineNumber');
    service.inputKey('5');
    expect(service.combineNumber).toHaveBeenCalled();
  }));

  it('should test inputKey, if the input is leftBasket, go to checkValidBasket', async(() => {
    spyOn(service, 'checkValidBasket');
    service.inputKey(Sign.LEFTBASKET);
    expect(service.checkValidBasket).toHaveBeenCalled();
  }));

  it('should test inputKey, if the input is rightBasket, go to checkValidBasket', async(() => {
    spyOn(service, 'checkValidBasket');
    service.inputKey(Sign.RIGHTBASKET);
    expect(service.checkValidBasket).toHaveBeenCalled();
  }));

  it('should test inputKey, if the input is rightBasket, go to checkValidBasket', async(() => {
    spyOn(service, 'checkValidBasket');
    service.inputKey(Sign.RIGHTBASKET);
    expect(service.checkValidBasket).toHaveBeenCalled();
  }));

  it('should test inputKey, if the input is other sign, go to storeExpression', async(() => {
    spyOn(service, 'storeExpression');
    service.inputKey(Operator.ADD);
    expect(service.storeExpression).toHaveBeenCalled();
  }));

  it('should test storeExpression, if the input is equals, go to checkValidBasket', async(() => {
    spyOn(service, 'computeResult');
    service.inputKey(Sign.EQUALS);
    expect(service.computeResult).toHaveBeenCalled();
  }));

  it('should test storeExpression', async(() => {
    service.nextNumber = '5';
    service.inputKey(Operator.ADD);
    expect(service.expression).toEqual(['5', '+']);
  }));

  it('should test displayExpresstion', async(() => {
    service.expression = ['5', '*', '2'];
    spyOn(service, 'displayExpresstion').and.returnValue('5×2');

    expect(service.displayExpresstion()).toEqual('5×2');
  }));

  it('should test countBasket', async(() => {
    service.expression = ['(', '(', '5', '*', '2', ')', '-', '6'];
    spyOn(service, 'countBasket').and.returnValue({
      left: 2,
      right: 1
    });

    expect(service.countBasket()).toEqual({
      left: 2,
      right: 1
    });
  }));

  it('should test checkValidBasket with (, last item cannot be number', async(() => {
    service.expression = ['(', '(', '5'];
    spyOn(service, 'checkValidBasket').and.returnValue(undefined);

    expect(service.checkValidBasket(Sign.LEFTBASKET)).toEqual(undefined);
  }));

  it('should test checkValidBasket with (, last item cannot be )', async(() => {
    service.expression = ['(', '(', '5', '+', '1', ')'];
    spyOn(service, 'checkValidBasket').and.returnValue(undefined);

    expect(service.checkValidBasket(Sign.LEFTBASKET)).toEqual(undefined);
  }));

  it('should test checkValidBasket with (, expression is []', async(() => {
    service.expression = [];
    service.checkValidBasket(Sign.LEFTBASKET);

    expect(service.expression).toEqual(['(']);
  }));

  it('should test checkValidBasket with (, expression is ["("]', async(() => {
    service.expression = ['('];
    service.checkValidBasket(Sign.LEFTBASKET);

    expect(service.expression).toEqual(['(', '(']);
  }));

  it('should test checkValidBasket with ), last item cannot be a sign', async(() => {
    service.expression = ['(', '(', '5', '+'];
    spyOn(service, 'checkValidBasket').and.returnValue(undefined);

    expect(service.checkValidBasket(Sign.RIGHTBASKET)).toEqual(undefined);
  }));

  it('should test checkValidBasket with ), number of left basket = number of right bsket', async(() => {
    service.expression = ['(', '5', ')'];
    spyOn(service, 'checkValidBasket').and.returnValue(undefined);

    expect(service.checkValidBasket(Sign.RIGHTBASKET)).toEqual(undefined);
  }));

  it('should test checkValidBasket with ), number of left basket > number of right bsket', async(() => {
    service.expression = ['(', '(', '5', '+', '2', ')'];
    service.checkValidBasket(Sign.RIGHTBASKET);

    expect(service.expression).toEqual(['(', '(', '5', '+', '2', ')', ')']);
  }));

  it('should test combineNumber with number ', async(() => {
    service.nextNumber = '2';
    service.combineNumber('6');

    expect(service.nextNumber).toEqual('26');
  }));

  it('should test combineNumber with . ', async(() => {
    service.nextNumber = '2';
    service.combineNumber('.');

    expect(service.nextNumber).toEqual('2.');
  }));

  it('should test add', async(() => {
    service.sum = 2;
    spyOn(service, 'add').and.returnValue(this);
    expect(service.add(5)).toEqual(this);
  }));

  it('should test subtract', async(() => {
    service.sum = 2;
    spyOn(service, 'subtract').and.returnValue(this);
    expect(service.subtract(5)).toEqual(this);
  }));

  it('should test multiply', async(() => {
    service.sum = 2;
    spyOn(service, 'multiply').and.returnValue(this);
    expect(service.multiply(5)).toEqual(this);
  }));

  it('should test divide', async(() => {
    service.sum = 2;
    spyOn(service, 'divide').and.returnValue(this);
    expect(service.divide(5)).toEqual(this);
  }));

  it('should test equals', async(() => {
    service.sum = 2;
    spyOn(service, 'equals').and.returnValue(service.sum);
    expect(service.equals()).toEqual(service.sum);
  }));

  it('should test reset', async(() => {
    spyOn(service, 'reset').and.returnValue(0);
    expect(service.reset()).toEqual(0);
  }));

});
