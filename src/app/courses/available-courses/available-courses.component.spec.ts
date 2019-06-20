/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AvailableCoursesComponent } from './available-courses.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingAnimationComponent } from 'src/app/_ui/loading-animation/loading-animation.component';

describe('AvailableCoursesComponent', () => {
  let component: AvailableCoursesComponent;
  let fixture: ComponentFixture<AvailableCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableCoursesComponent,
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
    fixture = TestBed.createComponent(AvailableCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
