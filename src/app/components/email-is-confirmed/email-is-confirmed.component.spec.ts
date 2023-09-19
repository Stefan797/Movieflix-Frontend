import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailIsConfirmedComponent } from './email-is-confirmed.component';

describe('EmailIsConfirmedComponent', () => {
  let component: EmailIsConfirmedComponent;
  let fixture: ComponentFixture<EmailIsConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailIsConfirmedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailIsConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
