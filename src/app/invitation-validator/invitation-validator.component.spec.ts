import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationValidatorComponent } from './invitation-validator.component';

describe('InvitationValidatorComponent', () => {
  let component: InvitationValidatorComponent;
  let fixture: ComponentFixture<InvitationValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
