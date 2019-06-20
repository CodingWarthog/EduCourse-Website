/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersInfoDisplayComponent } from './users-info-display.component';

describe('UsersInfoDisplayComponent', () => {
  let component: UsersInfoDisplayComponent;
  let fixture: ComponentFixture<UsersInfoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersInfoDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
