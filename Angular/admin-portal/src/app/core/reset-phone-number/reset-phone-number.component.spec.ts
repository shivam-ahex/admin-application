import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPhoneNumberComponent } from './reset-phone-number.component';

describe('ResetPhoneNumberComponent', () => {
  let component: ResetPhoneNumberComponent;
  let fixture: ComponentFixture<ResetPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPhoneNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
