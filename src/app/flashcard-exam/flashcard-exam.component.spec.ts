/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlashcardExamComponent } from './flashcard-exam.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MyFlashcardExamSetComponent } from './my-flashcard-exam-set/my-flashcard-exam-set.component';
import { DisplayFlashcardSetComponent } from './display-flashcard-set/display-flashcard-set.component';
import { LoadingAnimationComponent } from '../_ui/loading-animation/loading-animation.component';

describe('FlashcardExamComponent', () => {
  let component: FlashcardExamComponent;
  let fixture: ComponentFixture<FlashcardExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardExamComponent,
      DisplayFlashcardSetComponent,
      MyFlashcardExamSetComponent,
      LoadingAnimationComponent ],
      imports: [
        RouterModule.forRoot([]),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
