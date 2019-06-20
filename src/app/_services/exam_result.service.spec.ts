/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExamresultService } from './examresult.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Exam_result', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ExamresultService]
    });
  });

  it('should ...', inject([ExamresultService], (service: ExamresultService) => {
    expect(service).toBeTruthy();
  }));
});
