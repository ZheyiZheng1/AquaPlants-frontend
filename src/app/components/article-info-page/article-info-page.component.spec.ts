import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleInfoPageComponent } from './article-info-page.component';

describe('ArticleInfoPageComponent', () => {
  let component: ArticleInfoPageComponent;
  let fixture: ComponentFixture<ArticleInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
