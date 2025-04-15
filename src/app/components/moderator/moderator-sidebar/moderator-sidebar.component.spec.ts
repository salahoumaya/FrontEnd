import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorSidebarComponent } from './moderator-sidebar.component';

describe('ModeratorSidebarComponent', () => {
  let component: ModeratorSidebarComponent;
  let fixture: ComponentFixture<ModeratorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
