import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftExamComponent } from './draft-exam.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('DraftExamComponent', () => {
  let component: DraftExamComponent;
  let fixture: ComponentFixture<DraftExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftExamComponent ],
      imports: [
        RouterModule.forRoot([]),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        DragDropModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
