import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestResultComponent } from './admin-test-result.component';

describe('AdminTestResultComponent', () => {
  let component: AdminTestResultComponent;
  let fixture: ComponentFixture<AdminTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTestResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
