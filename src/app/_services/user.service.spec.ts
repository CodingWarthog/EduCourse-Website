/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService]
    });
  });

  

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should be adult ...', inject([UserService], (service: UserService) => {
    expect(service.CheckAdult(10)).toBeFalsy();
  }));
  it('shouldnt be adult ...', inject([UserService], (service: UserService) => {
    expect(service.CheckAdult(18)).toBeTruthy();
  }));
});
