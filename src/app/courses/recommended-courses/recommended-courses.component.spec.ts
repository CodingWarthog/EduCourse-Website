import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedCoursesComponent } from './recommended-courses.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingAnimationComponent } from 'src/app/_ui/loading-animation/loading-animation.component';

describe('RecommendedCoursesComponent', () => {
  let component: RecommendedCoursesComponent;
  let fixture: ComponentFixture<RecommendedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedCoursesComponent,
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
    fixture = TestBed.createComponent(RecommendedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
