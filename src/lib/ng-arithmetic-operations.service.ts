import { Injectable } from '@angular/core';
import { Calculation } from './model/calculation';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NgArithmeticOperationsService {
  
  // sum for general calculate
  private sum: number = 0;

  // sumSource for reactive programing
  private sumSource = new BehaviorSubject('0');
  private previosNum = '0';

  sumData = this.sumSource.asObservable();

  constructor() { }

  setValue(val: string) {
    if (this.previosNum === '0') {
      this.previosNum = val;
    } else {
      this.previosNum = this.previosNum + val;
    }
    this.sumSource.next(this.previosNum);
  }

  resetValue() {
    this.previosNum = '0';
    this.sumSource.next('0');
  }

  // getValue(): Observable<any> {
  //   const sum: any = this.sum;
  //   return of(sum);;
  // }

  add(val: string) {
    const num: number = Number(val);
    this.sum = this.sum + num;
    return this;
  }

  subtract(val: string) {
    const num: number = Number(val);
    this.sum = this.sum - num;
    return this;
  }

  multiply(val: string) {
    const num: number = Number(val);
    this.sum = this.sum * num;
    return this;
  }

  divide(val: string) {
    const num: number = Number(val);
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
