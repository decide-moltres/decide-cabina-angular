import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingOptionComponent } from './voting-option.component';

import { Option } from 'src/app/models/option.model';

describe('VotingOptionComponent', () => {
  let component: VotingOptionComponent;
  let fixture: ComponentFixture<VotingOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotingOptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingOptionComponent);
    component = fixture.componentInstance;
    component.option = new Option(1, 'Something');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
