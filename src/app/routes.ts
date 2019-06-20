import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { ExamComponent } from './exam/exam.component';
import { UsersComponent } from './users/users.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { FlashcardExamComponent } from './flashcard-exam/flashcard-exam.component';
import { StudyFlashcardComponent } from './flashcard-exam/study-flashcard/study-flashcard.component';
import { AddFlashcardCardComponent } from './flashcard-exam/add-flashcard-card/add-flashcard-card.component';
import { AddFlashcardSetComponent } from './flashcard-exam/add-flashcard-set/add-flashcard-set.component';
import { DisplayFlashcardCardComponent } from './flashcard-exam/display-flashcard-card/display-flashcard-card.component';
import { DisplayFlashcardSetComponent } from './flashcard-exam/display-flashcard-set/display-flashcard-set.component';
import { MyCoursesCreatedComponent } from './courses/my-courses-created/my-courses-created.component';
import { AddExamComponent } from './courses/add-exam/add-exam.component';
import { AddQuestionComponent } from './courses/add-question/add-question.component';
import { ImageComponent } from './users/image/image.component';
import { EducationalMaterialComponent } from './educational-material/educational-material.component';
import { DraftExamComponent } from './draft-exam/draft-exam.component';
import { AddBlockItemComponent } from './courses/add-block-item/add-block-item.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'addcourse',
    component: AddCourseComponent
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'addexam/:id',
    component: AddExamComponent
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'addquestion/:id',
    component: AddQuestionComponent
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'addblock/:id',
    component: AddBlockItemComponent
  },
  { path: 'login', component: LoginComponent },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'courses',
    component: CoursesComponent
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'exam',
    component: ExamComponent
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'draft_exam',
    component: DraftExamComponent
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'flashcard_exam',
    component: FlashcardExamComponent
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'flashcard_exam_study/:id',
    component: StudyFlashcardComponent
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'flashcard_exam_add_card/:id',
    component: AddFlashcardCardComponent
  },
  { path: 'flashcard_exam_add_set', component: AddFlashcardSetComponent },
  {
    path: 'flashcard_exam_display_card',
    component: DisplayFlashcardCardComponent
  },
  {
    path: 'flashcard_exam_display_set',
    component: DisplayFlashcardSetComponent
  },
  { path: 'flashcard_exam', component: ExamComponent },
  { path: 'study_flashcard', component: StudyFlashcardComponent },
  { path: 'created_courses', component: MyCoursesCreatedComponent },
  { path: 'images', component: ImageComponent },
  { path: 'material', component: EducationalMaterialComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
