import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFullscreenComponent } from './movie-fullscreen.component';

describe('MovieFullscreenComponent', () => {
  let component: MovieFullscreenComponent;
  let fixture: ComponentFixture<MovieFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieFullscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
