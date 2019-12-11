import { TestBed } from '@angular/core/testing';

import { AuthenticationnService } from './authenticationn.service';

describe('AuthenticationnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationnService = TestBed.get(AuthenticationnService);
    expect(service).toBeTruthy();
  });
});
