/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersInfoUpdateComponent } from './users-info-update.component';

describe('UsersInfoUpdateComponent', () => {
  let component: UsersInfoUpdateComponent;
  let fixture: ComponentFixture<UsersInfoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersInfoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersInfoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
