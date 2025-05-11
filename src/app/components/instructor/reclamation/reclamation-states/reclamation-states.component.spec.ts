import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationStatesComponent } from './reclamation-states.component';

describe('ReclamationStatesComponent', () => {
  let component: ReclamationStatesComponent;
  let fixture: ComponentFixture<ReclamationStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationStatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
