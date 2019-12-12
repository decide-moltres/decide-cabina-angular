import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsComponent } from './votings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VotingsComponent', () => {
  let component: VotingsComponent;
  let fixture: ComponentFixture<VotingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
