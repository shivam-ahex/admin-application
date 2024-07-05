import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwdQuestionComponent } from './reset-pwd-question.component';

describe('ResetPwdQuestionComponent', () => {
  let component: ResetPwdQuestionComponent;
  let fixture: ComponentFixture<ResetPwdQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPwdQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPwdQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
