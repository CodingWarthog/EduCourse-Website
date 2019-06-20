/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersResultQuizComponent } from './users-result-quiz.component';

describe('UsersResultQuizComponent', () => {
  let component: UsersResultQuizComponent;
  let fixture: ComponentFixture<UsersResultQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersResultQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersResultQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
