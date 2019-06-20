/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlashcardService } from './flashcard.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Flashcard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [FlashcardService]
    });
  });

  it('should ...', inject([FlashcardService], (service: FlashcardService) => {
    expect(service).toBeTruthy();
  }));
});
