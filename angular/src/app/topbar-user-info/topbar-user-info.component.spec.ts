import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarUserInfoComponent } from './topbar-user-info.component';

describe('TopbarUserInfoComponent', () => {
  let component: TopbarUserInfoComponent;
  let fixture: ComponentFixture<TopbarUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
