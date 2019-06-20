// import { DataSource } from '@angular/cdk/table';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Course } from '../_models/course';
// import { CourseService } from '../_services/course.service';
// import { CollectionViewer } from '@angular/cdk/collections';
// import { catchError, finalize } from 'rxjs/operators';
// import { PaginatedResult } from '../_models/pagination/pagination';

// export class LessonsDataSource implements DataSource<Course> {
//   private lessonsSubject = new BehaviorSubject<Course[]>([]);
//   private loadingSubject = new BehaviorSubject<boolean>(false);

//   public loading$ = this.loadingSubject.asObservable();

//   constructor(private courseService: CourseService) {}

//   connect(collectionViewer: CollectionViewer): Observable<Course[]> {
//     return this.lessonsSubject.asObservable();
//   }

//   disconnect(collectionViewer: CollectionViewer): void {
//     this.lessonsSubject.complete();
//     this.loadingSubject.complete();
//   }

//   loadLessons(pageIndex = 0, pageSize = 3) {
//     this.loadingSubject.next(true);
//     this.courseService
//       .getAllCourses(pageIndex, pageSize)
//       .pipe(
//         catchError(() => of([])),
//         finalize(() => this.loadingSubject.next(false))
//       )
//       //.subscribe(course => this.lessonsSubject.next(course));
//   }
// }
