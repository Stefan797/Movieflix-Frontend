import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieHoverContainerComponent } from './movie-hover-container.component';

describe('MovieHoverContainerComponent', () => {
  let component: MovieHoverContainerComponent;
  let fixture: ComponentFixture<MovieHoverContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieHoverContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieHoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
