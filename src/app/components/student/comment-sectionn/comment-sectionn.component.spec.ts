import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSectionnComponent } from './comment-sectionn.component';

describe('CommentSectionnComponent', () => {
  let component: CommentSectionnComponent;
  let fixture: ComponentFixture<CommentSectionnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentSectionnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentSectionnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
