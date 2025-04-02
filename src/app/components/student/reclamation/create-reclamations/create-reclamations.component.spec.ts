import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReclamationComponent } from './create-reclamations.component';

describe('CreateReclamationmesReclamationsComponent', () => {
  let component: CreateReclamationComponent;
  let fixture: ComponentFixture<CreateReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReclamationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
