/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExamService } from './exam.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Exam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ExamService]
    });
  });

  it('should ...', inject([ExamService], (service: ExamService) => {
    expect(service).toBeTruthy();
  }));
});
