import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgArithmeticOperationsComponent } from './ng-arithmetic-operations.component';

describe('NgArithmeticOperationsComponent', () => {
  let component: NgArithmeticOperationsComponent;
  let fixture: ComponentFixture<NgArithmeticOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgArithmeticOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgArithmeticOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
