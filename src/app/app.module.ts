import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxGalleryModule } from 'ngx-gallery';

import { NavigationComponent } from './navigation/navigation.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesComponent } from './courses/courses.component';
import { AvailableCoursesComponent } from './courses/available-courses/available-courses.component';
import { CourseService } from './_services/course.service';
import { MyCoursesComponent } from './courses/my-courses/my-courses.component';
import { ExamComponent } from './exam/exam.component';
import { AvailableExamsComponent } from './courses/available-exams/available-exams.component';
import { UsersComponent } from './users/users.component';
import { UsersInfoDisplayComponent } from './users/users-info-display/users-info-display.component';
import { UsersInfoUpdateComponent } from './users/users-info-update/users-info-update.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { FlashcardExamComponent } from './flashcard-exam/flashcard-exam.component';
import { AddFlashcardSetComponent } from './flashcard-exam/add-flashcard-set/add-flashcard-set.component';
import { DisplayFlashcardCardComponent } from './flashcard-exam/display-flashcard-card/display-flashcard-card.component';
import { DisplayFlashcardSetComponent } from './flashcard-exam/display-flashcard-set/display-flashcard-set.component';
import { AddFlashcardCardComponent } from './flashcard-exam/add-flashcard-card/add-flashcard-card.component';
import { StudyFlashcardComponent } from './flashcard-exam/study-flashcard/study-flashcard.component';
import { UsersResultFlashcardQuizComponent } from './users/users-result-flashcard-quiz/users-result-flashcard-quiz.component';
import { UsersResultQuizComponent } from './users/users-result-quiz/users-result-quiz.component';
import { ExamService } from './_services/exam.service';
import { MyCoursesCreatedComponent } from './courses/my-courses-created/my-courses-created.component';
import { MyExamsCreatedComponent } from './courses/my-exams-created/my-exams-created.component';
import { AddExamComponent } from './courses/add-exam/add-exam.component';
import { AddQuestionComponent } from './courses/add-question/add-question.component';
import { MyFlashcardExamSetComponent } from './flashcard-exam/my-flashcard-exam-set/my-flashcard-exam-set.component';
import { FlashcardService } from './_services/flashcard.service';
import { LoadingAnimationComponent } from './_ui/loading-animation/loading-animation.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { ExamresultService } from './_services/examresult.service';
import { ImageComponent } from './users/image/image.component';
import { VideoComponent } from './users/video/video.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { EducationalMaterialComponent } from './educational-material/educational-material.component';
import { VideoAssetsComponent } from './educational-material/video-assets/video-assets.component';
import { ImageAssetsComponent } from './educational-material/image-assets/image-assets.component';
import { DocumentAssetsComponent } from './educational-material/document-assets/document-assets.component';
import { AddCategoryComponent } from './courses/add-category/add-category.component';
import { DraftExamComponent } from './draft-exam/draft-exam.component';
import { BadgesComponent } from './users/badges/badges.component';
import { AddBadgesComponent } from './users/add-badges/add-badges.component';
import { AddBlockItemComponent } from './courses/add-block-item/add-block-item.component';
import { RolesComponent } from './users/roles/roles.component';
import { UserBadgesComponent } from './users/user-badges/user-badges.component';
import { DraftComponent } from './courses/draft/draft.component';
import { NormalComponent } from './courses/normal/normal.component';
import { RecommendedCoursesComponent } from './courses/recommended-courses/recommended-courses.component';
import { ChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { UploadComponent } from './users/upload/upload.component';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from 'src/app/_services/mock-user.service';
import { DyrektywaDirective } from './_guards/dyrektywa.directive';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    LoginComponent,
    CoursesComponent,
    AvailableCoursesComponent,
    MyCoursesComponent,
    ExamComponent,
    AvailableExamsComponent,
    UsersComponent,
    UsersInfoDisplayComponent,
    UsersInfoUpdateComponent,
    AddCourseComponent,
    FlashcardExamComponent,
    AddFlashcardCardComponent,
    AddFlashcardSetComponent,
    DisplayFlashcardCardComponent,
    DisplayFlashcardSetComponent,
    StudyFlashcardComponent,
    UsersResultFlashcardQuizComponent,
    UsersResultQuizComponent,
    MyCoursesCreatedComponent,
    MyExamsCreatedComponent,
    AddExamComponent,
    AddQuestionComponent,
    MyFlashcardExamSetComponent,
    LoadingAnimationComponent,
    SideNavigationComponent,
    ImageComponent,
    VideoComponent,
    FileSelectDirective,
    FileDropDirective,
    EducationalMaterialComponent,
    VideoAssetsComponent,
    ImageAssetsComponent,
    DocumentAssetsComponent,
    AddCategoryComponent,
    DraftExamComponent,
    BadgesComponent,
    AddBadgesComponent,
    AddBlockItemComponent,
    RolesComponent,
    UserBadgesComponent,
    DraftComponent,
    NormalComponent,
    RecommendedCoursesComponent,
    UploadComponent,
    DyrektywaDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    MaterialModule,
    DragDropModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    GoogleChartsModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    TabsModule.forRoot()
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    CourseService,
    ExamService,
    FlashcardService,
    ExamresultService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
