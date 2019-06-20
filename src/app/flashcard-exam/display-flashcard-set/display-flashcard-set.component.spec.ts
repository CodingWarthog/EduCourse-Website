/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DisplayFlashcardSetComponent } from './display-flashcard-set.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingAnimationComponent } from 'src/app/_ui/loading-animation/loading-animation.component';

describe('DisplayFlashcardSetComponent', () => {
  let component: DisplayFlashcardSetComponent;
  let fixture: ComponentFixture<DisplayFlashcardSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFlashcardSetComponent,
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
    fixture = TestBed.createComponent(DisplayFlashcardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
