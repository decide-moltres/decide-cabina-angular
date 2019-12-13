import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingItemComponent } from './voting-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VotingItemComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotingItemComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

});
