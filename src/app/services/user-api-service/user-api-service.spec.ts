import { TestBed } from '@angular/core/testing';

import { UserApiService } from './user-api-service';

describe('LoginApiService', () => {
  let service: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
