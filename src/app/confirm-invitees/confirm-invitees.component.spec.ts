import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInviteesComponent } from './confirm-invitees.component';

describe('ConfirmInviteesComponent', () => {
  let component: ConfirmInviteesComponent;
  let fixture: ComponentFixture<ConfirmInviteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmInviteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInviteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
