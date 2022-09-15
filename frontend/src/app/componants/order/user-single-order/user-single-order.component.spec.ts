import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleOrderComponent } from './user-single-order.component';

describe('UserSingleOrderComponent', () => {
  let component: UserSingleOrderComponent;
  let fixture: ComponentFixture<UserSingleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSingleOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSingleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
