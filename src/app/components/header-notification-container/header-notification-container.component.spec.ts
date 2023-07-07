import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNotificationContainerComponent } from './header-notification-container.component';

describe('HeaderNotificationContainerComponent', () => {
  let component: HeaderNotificationContainerComponent;
  let fixture: ComponentFixture<HeaderNotificationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNotificationContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNotificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
