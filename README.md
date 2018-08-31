# ng-arithmetic-operations
An Angular 6 library for arithmetic operations


## Install 

```npm i ng-arithmetic-operations```

##### app.module.ts

    import { NgArithmeticOperationsModule, NgArithmeticOperationsService } from 'ng-arithmetic-operations';
    
    @NgModule({
      imports: [
        NgArithmeticOperationsModule
      ],
      providers: [NgArithmeticOperationsService]
    })

##### app.comp.ts

    import { NgArithmeticOperationsService } from 'ng-arithmetic-operations';
    
    export class AppComponent implements OnInit {
      constructor(private _ngAOService: NgArithmeticOperationsService) {}
    }

## Usage
    import { NGAO  } from 'ng-arithmetic-operations';
    
    NGAO.add(2).multiply(5);

##### or
    import { NgArithmeticOperationsService  } from 'ng-arithmetic-operations';

    onButtonClick(key: string) {
        this._ngAOService.inputKey(key);
    }
    onResetClick() {
        this._ngAOService.resetValue();
    }
    getExpression() {
        this._ngAOService.getExpression().subscribe(total => this.total = total);
    }

#License

Code released under the MIT license.