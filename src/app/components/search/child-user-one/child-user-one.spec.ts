import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildUserOne } from './child-user-one';

describe('ChildUserOne', () => {
  let component: ChildUserOne;
  let fixture: ComponentFixture<ChildUserOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildUserOne],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildUserOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
