import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProfileSettingsContainerComponent } from './header-profile-settings-container.component';

describe('HeaderProfileSettingsContainerComponent', () => {
  let component: HeaderProfileSettingsContainerComponent;
  let fixture: ComponentFixture<HeaderProfileSettingsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderProfileSettingsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderProfileSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
