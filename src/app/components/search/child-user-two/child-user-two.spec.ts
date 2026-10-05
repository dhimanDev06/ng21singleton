import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildUserTwo } from './child-user-two';

describe('ChildUserTwo', () => {
  let component: ChildUserTwo;
  let fixture: ComponentFixture<ChildUserTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildUserTwo],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildUserTwo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
