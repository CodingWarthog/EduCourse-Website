import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalComponent } from './normal.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('NormalComponent', () => {
  let component: NormalComponent;
  let fixture: ComponentFixture<NormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalComponent ],
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
    fixture = TestBed.createComponent(NormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
