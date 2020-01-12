import { TestBed, getTestBed } from '@angular/core/testing';

import { VotingService } from './voting.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('VotingService', () => {
  let injector: TestBed;
  let service: VotingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VotingService],
    });

    injector = getTestBed();
    service = injector.get(VotingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test voting types', () => {
    const values = [
      ['S', 'Senate'],
      ['P', 'Presidential'],
      ['PP', 'Presidential primaries'],
      ['SP', 'Senate primaries'],
      ['asd', 'Other']];
    values.forEach(v => {
      expect(service.votingTipe(v[0])).toBe(v[1]);
    });
  });

  it('should test provinces', () => {
    const values = [
      ['S', 'Sevillistán'],
      ['H', 'Huelvistán'],
      ['C', 'Cadistán'],
      ['asd', '']];
    values.forEach(v => {
      expect(service.votingProvince(v[0])).toBe(v[1]);
    });
  });

  it('should get a voting', () => {
    const id = 1;
    service.getVoting(id).subscribe((res) => {
      expect(res).toEqual('asd');
    }, (error) => {
      expect(error).toEqual('asd');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}voting/?id=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush('asd');
  });

  it('should get votings', () => {
    const userId = 1;
    service.getVotingsByUserId(userId).subscribe((res) => {
      expect(res).toEqual('asd');
    }, (error) => {
      expect(error).toEqual('asd');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}voting/user/?id=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush('asd');
  });
});
