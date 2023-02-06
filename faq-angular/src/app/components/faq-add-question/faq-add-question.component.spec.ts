import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAddQuestionComponent } from './faq-add-question.component';

describe('FaqAddQuestionComponent', () => {
  let component: FaqAddQuestionComponent;
  let fixture: ComponentFixture<FaqAddQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqAddQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
