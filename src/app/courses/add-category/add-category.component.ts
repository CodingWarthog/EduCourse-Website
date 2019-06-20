import { OnInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CourseService } from 'src/app/_services/course.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category/category.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  dataSource = new MatTableDataSource();
  category: Category[];
  categoryForAdd: Category;
  showSpinner = true;
  displayedColumns = ['name', 'delete'];
  selected = 'option2';
  addCategoryForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.createAddCourseForm();
    this.courseService.getCategory().subscribe(result => {
      this.category = result;
      console.log(this.category);
      this.dataSource = new MatTableDataSource(this.category);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  createAddCourseForm() {
    this.addCategoryForm = this.fb.group({
      name: ['']
    });
  }
  addCourse() {
    if (this.addCategoryForm.valid) {
      this.categoryForAdd = Object.assign({}, this.addCategoryForm.value);
      this.courseService.addCategory(this.categoryForAdd).subscribe(
        () => {
          this.alertifyService.success('Kategoria została utworzona');
          this.addCategoryForm.reset();
          this.ngOnInit();
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  deleteCategory(row) {
    const category_id = (row.id);
    console.log(category_id);
    console.log(row);
    this.courseService.deleteCategory(category_id).subscribe(
      () => {
        this.alertifyService.success('Kategoria została usunieta');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
}
