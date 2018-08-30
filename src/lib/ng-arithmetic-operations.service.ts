import { Injectable } from '@angular/core';
import { ErrorCode, Operator, Sign, ConvertOperator, ConvertSign } from './const';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NgArithmeticOperationsService {

  // sum for general calculate
  private sum: number = 0;

  private totalNumber = '0';
  private nextNumber = '0'
  private expression: string[] = [];

  // sumSource and errorSource for reactive programing
  private sumSource = new BehaviorSubject('0');
  private errorSource = new BehaviorSubject({});
  sumData = this.sumSource.asObservable();
  errorData = this.errorSource.asObservable();

  constructor() { }

  /**
   * 
   * @param item check is number or not
   */
  isNumber(item: string) {
    return /[+-]?([0-9]*[.])?[0-9]+/g.test(item);
  }

  isSign() {

  }

  /**
   * 
   * @param input from press any number buttons 
   */
  inputKey(key: string) {
    console.log('Input Key::::', key);

    if (!ConvertOperator[key] && !this.isNumber(key) && !ConvertSign[key]) {
      this.errorSource.next({
        code: ErrorCode.ERR0001,
        msg: 'ERROR PARAMETER'
      });
      return;
    }

    if (this.isNumber(key) || key === Sign.DOT) {
      this.combineNumber(key);
      this.sumSource.next(this.expression.join('') + this.nextNumber);
    } else if (key === Sign.LEFTBASKET || key === Sign.RIGHTBASKET) {
      this.checkValidBasket(key);
      this.sumSource.next(this.expression.join(''));
    } else {

      this.expression.push(this.nextNumber);

      /**
       * click operator button will push number every time
       * this condition will check the last sign whether is ) or not
       * if yes pop out last number
       * otherwise it will cause eval() failed
       */
      if (this.expression[this.expression.length - 2] === ConvertSign.rightBasket) {
        this.expression.pop();
      }
      // this.totalNumber = this.nextNumber;
      
      this.nextNumber = '0';

      if (key !== Sign.EQUALS) {
        this.expression.push(ConvertOperator[key]);
        this.sumSource.next(this.expression.join(''));
      } else {
        this.computeResult();
        
      }
      

    }
    console.log(this.expression);
  }

  /**
   * while press C will call this function
   */
  resetValue() {
    this.nextNumber = '0';
    this.expression = [];
    // console.log('RESET:::', this.nextNumber, this.expression);

    this.sumSource.next('0');
  }

  countBasket() {
    let left = 0, right = 0;

    this.expression.forEach(s => {
      if (s === ConvertSign[Sign.LEFTBASKET]) {
        left++;
      } else if (s === ConvertSign[Sign.RIGHTBASKET]) {
        right++;
      }
    });

    return {
      left: left,
      right: right
    }
  }

  checkValidBasket(key: Sign) {
    let arrLength = this.expression.length;

    if (key === Sign.LEFTBASKET) {

      if ((!this.isNumber(this.expression[arrLength - 1]) && this.expression[arrLength - 1] !== ConvertSign.rightBasket) || arrLength === 0) {
        this.expression.push(ConvertSign[key]);
        
      } else {
        this.errorSource.next({
          code: ErrorCode.ERR0002,
          msg: 'ERROR INPUT'
        });
        console.log('ERROR INPUT!!!!');
        return;
      }
    } else {
      // if (this.expression[arrLength - 1] !== ConvertSign.rightBasket) {
        this.expression.push(this.nextNumber);
        
        // this.totalNumber = this.nextNumber;
        this.nextNumber = '0';
      // }

      arrLength = this.expression.length; // array length changed, so assign new value

      /**
       * right basket must match:
       * 1. illegal left basket number
       * 2. last item is a number
       */
      let basket = this.countBasket();

      if ((basket.left > basket.right && this.isNumber(this.expression[arrLength - 1])) || (basket.left > basket.right && this.expression[arrLength - 1] === ConvertSign.rightBasket)) {
        this.expression.push(ConvertSign[key]);
        
      } else {
        this.expression.pop();
        this.errorSource.next({
          code: ErrorCode.ERR0002,
          msg: 'ERROR INPUT'
        });
        console.log('ERROR INPUT!!!!');
        return;
      }
    }
  }

  combineNumber(input: string) {
    input = input === Sign.DOT ? ConvertSign.dot : input;

    if (input === ConvertSign.dot && this.nextNumber.includes('.')) {
      this.errorSource.next({
        code: ErrorCode.ERR0002,
        msg: 'ERROR INPUT'
      });
      console.log('ERROR INPUT!!!!');
      return;
    }

    if (this.nextNumber === '0' && input !== ConvertSign.dot) {
      this.nextNumber = input;
    } else {
      this.nextNumber = this.nextNumber + input;
    }

  }

  computeResult() {
    let basket = this.countBasket();
    let result = 0

    if (basket.left !== basket.right) {
      this.expression.pop();
      this.errorSource.next({
        code: ErrorCode.ERR0002,
        msg: 'ERROR INPUT'
      });
      console.log('ERROR INPUT!!!!');
      return;
    }

    result = eval(this.expression.join(''));
    this.sumSource.next(result.toString());
    this.expression = [];
  }



  /**
   * 
   * @param num general calculation 
   */
  add(num: number) {
    this.sum = this.sum + num;
    return this;
  }

  subtract(num: number) {
    this.sum = this.sum - num;
    return this;
  }

  multiply(num: number) {
    this.sum = this.sum * num;
    return this;
  }

  divide(num: number) {
    this.sum = this.sum / num;
    return this;
  }

  equals(): number {
    return this.sum;
  }

  reset(): number {
    return this.sum = 0;
  }
}

export const NGAO = new NgArithmeticOperationsService();
