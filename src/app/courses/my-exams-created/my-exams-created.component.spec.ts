/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyExamsCreatedComponent } from './my-exams-created.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NormalComponent } from '../normal/normal.component';
import { DraftComponent } from '../draft/draft.component';

describe('MyExamsCreatedComponent', () => {
  let component: MyExamsCreatedComponent;
  let fixture: ComponentFixture<MyExamsCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyExamsCreatedComponent,
                      NormalComponent,
                    DraftComponent ],
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
    fixture = TestBed.createComponent(MyExamsCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
