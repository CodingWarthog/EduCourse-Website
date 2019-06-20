import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlashcardSet } from '../_models/flashcard/flashcard-set';
import { Flashcard } from '../_models/flashcard/flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMyFlashcardSet(id: number) {
    return this.http.get<FlashcardSet[]>(this.baseUrl + 'flashcardsets/' + id);
  }
  getAllFlashcardSet() {
    return this.http.get<FlashcardSet[]>(this.baseUrl + 'flashcardsets/');
  }
  addFlashcardSet(flashcardSet: FlashcardSet) {
    return this.http.post<FlashcardSet[]>(this.baseUrl + 'flashcardsets/', flashcardSet);
  }
  addFlashcard(flashcard: Flashcard) {
    return this.http.post<Flashcard[]>(this.baseUrl + 'flashcards/', flashcard);
  }
  deleteFlashcardSet(flashcardSetId: number)  {
    const url = this.baseUrl + `flashcardsets/` + flashcardSetId;
    return this.http.delete(url);
  }
  deleteFlashcard(flashcardId: number)  {
    const url = this.baseUrl + `flashcards/` + flashcardId;
    return this.http.delete(url);
  }
  getSetFlashcard(id: number) {
    return this.http.get<Flashcard[]>(this.baseUrl + 'flashcards/' + id);
  }
}


