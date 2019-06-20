import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Question } from 'src/app/_models/question/question';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ExamService } from 'src/app/_services/exam.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BlockItem } from 'src/app/_models/draft/blockItem';

@Component({
  selector: 'app-add-block-item',
  templateUrl: './add-block-item.component.html',
  styleUrls: ['./add-block-item.component.scss']
})
export class AddBlockItemComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns = ['content', 'blockPosition', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  block: BlockItem;
  blocks: BlockItem[];
  addBlockItemForm: FormGroup;
  currentNumberOfBlock: number;
  examQuestionLimit: number;
  isAddingEnabled = true;
  id: number;
  private sub: any;
  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createAddQuestionForm();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
    });
    this.examService.getDraftExam(this.id).subscribe(result => {
      this.blocks = result['blockItem'];
      this.examQuestionLimit = result['numberOfQuestions'];
      this.currentNumberOfBlock = this.blocks.length;
      this.dataSource = new MatTableDataSource(this.blocks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.disableAdding(this.examQuestionLimit, this.currentNumberOfBlock);
    });
  }
  createAddQuestionForm() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
    });
    this.addBlockItemForm = this.fb.group({
      content: [''],
      blockPosition: [''],
      examId: [this.id]
    });
  }
  disableAdding(examQuestionLimit: number, currentNumberOfBlock: number) {
    if (currentNumberOfBlock >= examQuestionLimit) {
      this.isAddingEnabled = false;
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  deleteItem(row) {
    const exam_id = row.id;
    console.log(exam_id);
    console.log(row);
    this.examService.deleteBlock(exam_id).subscribe(
      () => {
        this.alertifyService.success('Blok został usuniety');
        this.ngOnInit();
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
  addItem() {
    if (this.addBlockItemForm.valid) {
      this.block = Object.assign({}, this.addBlockItemForm.value);
      this.examService.addBlock(this.block).subscribe(
        () => {
          this.alertifyService.success('Blok został dodany');
          // this.router.navigate(['/addquestion', this.id]);
          this.addBlockItemForm.reset();
          this.ngOnInit();
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
}
