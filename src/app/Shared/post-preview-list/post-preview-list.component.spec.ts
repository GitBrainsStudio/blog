import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostPreviewListComponent } from './post-preview-list.component';

describe('PostPreviewListComponent', () => {
  let component: PostPreviewListComponent;
  let fixture: ComponentFixture<PostPreviewListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPreviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
