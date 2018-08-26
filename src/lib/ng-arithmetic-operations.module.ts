import { NgModule } from '@angular/core';
import { NgArithmeticOperationsComponent } from './ng-arithmetic-operations.component';
import { FooComponent } from './foo/foo.component';

@NgModule({
  imports: [
  ],
  declarations: [
    NgArithmeticOperationsComponent,
    FooComponent
  ],
  exports: [
    NgArithmeticOperationsComponent,
    FooComponent
  ]
})
export class NgArithmeticOperationsModule { }
