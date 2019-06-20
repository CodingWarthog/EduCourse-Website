/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyCoursesCreatedComponent } from './my-courses-created.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('MyCoursesCreatedComponent', () => {
  let component: MyCoursesCreatedComponent;
  let fixture: ComponentFixture<MyCoursesCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCoursesCreatedComponent ],
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
    fixture = TestBed.createComponent(MyCoursesCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
