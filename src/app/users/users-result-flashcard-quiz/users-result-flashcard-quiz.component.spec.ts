/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersResultFlashcardQuizComponent } from './users-result-flashcard-quiz.component';

describe('UsersResultFlashcardQuizComponent', () => {
  let component: UsersResultFlashcardQuizComponent;
  let fixture: ComponentFixture<UsersResultFlashcardQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersResultFlashcardQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersResultFlashcardQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
