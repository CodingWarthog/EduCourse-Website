import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { DataService } from './mock-user.service';

describe('CoursesService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Angular default test added when you generate a service using the CLI
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#addUser()', () => {
    it('returned Observable should match the right data', () => {
      const mockCourse = {
        firstname: 'Mateusz',
        lastname: 'Chessable',
        username: 'Chessable',
        role: 'Chessable',
        email: 'test@gmail.com'
      };

      service.addUser({ topicId: 1 }).subscribe(courseData => {
        expect(courseData.firstname).toEqual('Mateusz');
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8089/topics/1/users'
      );

      expect(req.request.method).toEqual('POST');

      req.flush(mockCourse);
    });
  });
  describe('#getUserById', () => {
    it('returned Observable should match the right data', () => {
      const mockCourses = [
        {
          firstname: 'Test1',
          lastname: 'Test1',
          username: 'Test1',
          role: 'Test1',
          email: 'Test1@gmail.com'
        },
        {
          firstname: 'Test2',
          lastname: 'Test2',
          username: 'Test2',
          role: 'Test2',
          email: 'Test2@gmail.com'
         }
      ];

      service.getUserById(1).subscribe(coursesData => {
        expect(coursesData[0].firstname).toEqual('Test1');
        expect(coursesData[0].role).toEqual(
          'Test1'
        );

        expect(coursesData[1].firstname).toEqual('Test2');
        expect(coursesData[1].role).toEqual('Test2');
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8089/topics/1/users'
      );

      req.flush(mockCourses);
    });
  });
});
