import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmYourAccountComponent } from './confirm-your-account.component';

describe('ConfirmYourAccountComponent', () => {
  let component: ConfirmYourAccountComponent;
  let fixture: ComponentFixture<ConfirmYourAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmYourAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmYourAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
