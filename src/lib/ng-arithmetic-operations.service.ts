import { Injectable } from '@angular/core';
import { Calculation } from './model/calculation';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NgArithmeticOperationsService {
  
  // sum for general calculate
  private sum: number = 0;

  // sumSource for reactive programing
  private currentInput = '0';
  private expression: string[] = [];
  private sumSource = new BehaviorSubject('0');
  sumData = this.sumSource.asObservable();

  constructor() { }

  /**
   * 
   * @param item check is number or not
   */
  isNumber(item: string) {
    return /[0-9]+/g.test(item);
  }

  /**
   * 
   * @param input from press any number buttons 
   */
  inputValue(input: string) {
    if (this.isNumber(input)) {
      this.displayExpression(input);
    } else {
      this.expression.push(this.currentInput);
      this.currentInput = '0';
      this.operate(input);
    }
    console.log('TTTT', this.expression);
  }

  displayExpression(input: string) {
    if (this.currentInput === '0') {
      this.currentInput = input;
    } else {
      this.currentInput = this.currentInput + input;
    }
    this.sumSource.next(this.currentInput);
  }

  operate(input: string) {
    // check and filter illegal input
    /**
     * 1. ) can't start without (
     * 2. last item can't be operator
     */

    if (input === '=') {
      this.computeResult();
    } else {
      this.expression.push(input);
    }
  }

  computeResult() {
    // this.currentInput = eval(this.expression.join(''));
    
    this.sumSource.next(this.currentInput);
    this.expression = [];
  }

  /**
   * while press C will call this function
   */
  resetValue() {
    this.currentInput = '0';
    this.sumSource.next('0');
    this.expression = [];
  }

  // getValue(): Observable<any> {
  //   const sum: any = this.sum;
  //   return of(sum);;
  // }



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
