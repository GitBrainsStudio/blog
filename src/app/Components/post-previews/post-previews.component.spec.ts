import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPreviewsComponent } from './post-previews.component';

describe('PostPreviewsComponent', () => {
  let component: PostPreviewsComponent;
  let fixture: ComponentFixture<PostPreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPreviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
