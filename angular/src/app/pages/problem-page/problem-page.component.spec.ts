import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPageComponent } from './problem-page.component';

describe('ProblemPageComponent', () => {
  let component: ProblemPageComponent;
  let fixture: ComponentFixture<ProblemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
