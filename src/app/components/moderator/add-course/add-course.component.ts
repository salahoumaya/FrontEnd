import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from 'src/app/shared/service/TrainingPlan/training.service';
declare var bootstrap: any;

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddCourseComponent {
  selected: string = 'beginner';
  selected2: string = 'ONLINE';
  title: string = '';
  maxStudents: number=10;
  description: string = '';
  isSubmitting: boolean = false;

  modalTitle: string = '';
  modalMessage: string = '';
  isError: boolean = false;

  constructor(private trainingService: TrainingService) {}

  public onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const trainingData = {
      title: this.title.trim(),
      level: this.selected,
      typeTraning: this.selected2,
      description: this.description.trim(),
      maxStudents: this.maxStudents
    };

    this.trainingService.addTraining(trainingData).subscribe(
      () => {
        this.showModal('Success', 'Training added successfully!', false);
        form.resetForm();
        this.resetFormValues();
      },
      () => {
        this.showModal('Error', 'Error adding training. Please try again.', true);
      }
    ).add(() => {
      this.isSubmitting = false;
    });
  }

  private resetFormValues() {
    this.selected = 'beginner';
    this.selected2 = 'ONLINE';
    this.title = '';
    this.description = '';
  }

  private showModal(title: string, message: string, isError: boolean) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.isError = isError;

    const modal = new bootstrap.Modal(document.getElementById('responseModal'));
    modal.show();
  }
}
