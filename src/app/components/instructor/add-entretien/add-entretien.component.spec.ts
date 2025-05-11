import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntretienComponent } from './add-entretien.component';

describe('AddEntretienComponent', () => {
  let component: AddEntretienComponent;
  let fixture: ComponentFixture<AddEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEntretienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
