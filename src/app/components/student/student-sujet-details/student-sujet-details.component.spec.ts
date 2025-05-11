import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSujetDetailsComponent } from './student-sujet-details.component';

describe('StudentSujetDetailsComponent', () => {
  let component: StudentSujetDetailsComponent;
  let fixture: ComponentFixture<StudentSujetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSujetDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSujetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
