/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EducationalMaterialComponent } from './educational-material.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { VideoComponent } from '../users/video/video.component';
import { ImageAssetsComponent } from './image-assets/image-assets.component';
import { VideoAssetsComponent } from './video-assets/video-assets.component';
import { DocumentAssetsComponent } from './document-assets/document-assets.component';

describe('EducationalMaterialComponent', () => {
  let component: EducationalMaterialComponent;
  let fixture: ComponentFixture<EducationalMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalMaterialComponent,
      VideoAssetsComponent,
      ImageAssetsComponent,
      DocumentAssetsComponent ],
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
    fixture = TestBed.createComponent(EducationalMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
