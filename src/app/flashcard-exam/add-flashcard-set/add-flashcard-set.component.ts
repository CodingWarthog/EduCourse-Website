import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FlashcardService } from 'src/app/_services/flashcard.service';
import { FlashcardSet } from 'src/app/_models/flashcard/flashcard-set';

@Component({
  selector: 'app-add-flashcard-set',
  templateUrl: './add-flashcard-set.component.html',
  styleUrls: ['./add-flashcard-set.component.scss']
})
export class AddFlashcardSetComponent implements OnInit {
  flashcardSet: FlashcardSet;
  addFlashcardSetForm: FormGroup;
  id: number;
  private sub: any;
  data_utworzenia: Date;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private flashcardService: FlashcardService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createAddCourseForm();
  }
  createAddCourseForm() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    //   console.log(this.id);
    // });
    this.data_utworzenia = new Date();
    this.addFlashcardSetForm = this.fb.group({
      name: [''],
      level: [''],
      creationDate: [this.data_utworzenia],
      description: [''],
      other: [''],
      userId: [this.authService.decodedToken.nameid]
    });
  }
  addFlashcardSet() {
    if (this.addFlashcardSetForm.valid) {
      this.flashcardSet = Object.assign({}, this.addFlashcardSetForm.value);
      this.flashcardService.addFlashcardSet(this.flashcardSet).subscribe(
        () => {
          this.alertifyService.success('Zestaw został utworzony');
          this.router.navigate(['/flashcard_exam']);
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
}
