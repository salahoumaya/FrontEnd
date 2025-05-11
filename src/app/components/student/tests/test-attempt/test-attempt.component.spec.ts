import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttemptComponent } from './test-attempt.component';

describe('TestAttemptComponent', () => {
  let component: TestAttemptComponent;
  let fixture: ComponentFixture<TestAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAttemptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
