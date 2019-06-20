/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssetService } from './asset.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Asset', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AssetService]
    });
  }));

  it('should ...', inject([AssetService], (service: AssetService) => {
    expect(service).toBeTruthy();
  }));
});
