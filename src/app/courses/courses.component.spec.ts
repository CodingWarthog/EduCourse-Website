/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RecommendedCoursesComponent } from './recommended-courses/recommended-courses.component';
import { MyExamsCreatedComponent } from './my-exams-created/my-exams-created.component';
import { MyCoursesCreatedComponent } from './my-courses-created/my-courses-created.component';
import { AvailableCoursesComponent } from './available-courses/available-courses.component';
import { AvailableExamsComponent } from './available-exams/available-exams.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { LoadingAnimationComponent } from '../_ui/loading-animation/loading-animation.component';
import { NormalComponent } from './normal/normal.component';
import { DraftComponent } from './draft/draft.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent,
                      MyCoursesComponent,
                      RecommendedCoursesComponent,
                      MyExamsCreatedComponent,
                      MyCoursesCreatedComponent,
                      AvailableCoursesComponent,
                      AvailableExamsComponent,
                      AddCategoryComponent,
                      LoadingAnimationComponent,
                      NormalComponent,
                      DraftComponent
                     ],
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
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
