import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';
import { TrainingService } from 'src/app/shared/service/TrainingPlan/training.service';
declare var bootstrap: any;
interface data {
  active?: boolean;
}
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  trainings: any[] = [];
  filteredTrainings: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  searchDataValue: string = '';
  routes = routes;
  selectedTraining: any = {};
  newCourseTitle: string = '';
  newCourseLink: string = '';
  courseError: string = '';
  isAddingCourse: boolean = false;
  levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  types = ['ONLINE', 'Video'];


  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.fetchTrainings();
  }

  fetchTrainings() {
    this.isLoading = true;
    this.trainingService.getTrainingsForAuthenticatedTrainer().subscribe(
      (data) => {
        this.trainings = data;
        this.filteredTrainings = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load trainings. Please try again.';
        this.isLoading = false;
      }
    );
  }

  searchData() {
    if (!this.searchDataValue.trim()) {
      this.filteredTrainings = this.trainings;
    } else {
      this.filteredTrainings = this.trainings.filter(training =>
        training.title.toLowerCase().includes(this.searchDataValue.toLowerCase()) ||
        training.level.toLowerCase().includes(this.searchDataValue.toLowerCase()) ||
        training.typeTraning.toLowerCase().includes(this.searchDataValue.toLowerCase()) ||
        training.description.toLowerCase().includes(this.searchDataValue.toLowerCase())
      );
    }
  }

  openEditModal(training: any) {
    this.selectedTraining = { ...training }; // Copy selected training to avoid modifying the list directly
    const modal = new bootstrap.Modal(document.getElementById('editTrainingModal'));
    modal.show();
  }

  saveChanges() {
    if (!this.selectedTraining.id) return;

    this.trainingService.updateTraining(this.selectedTraining.id, this.selectedTraining).subscribe(
      (response) => {
        console.log('Training updated successfully:', response);

        // Update the local training list
        const index = this.trainings.findIndex(t => t.id === this.selectedTraining.id);
        if (index !== -1) {
          this.trainings[index] = { ...this.selectedTraining };
          this.filteredTrainings[index] = { ...this.selectedTraining };
        }

        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editTrainingModal'));
        modal.hide();
      },
      (error) => {
        console.error('Error updating training:', error);
      }
    );
  }
  openCoursesModal(training: any) {
    this.selectedTraining = { ...training }; // Copy training object
    this.newCourseTitle = ''; // Clear inputs
    this.newCourseLink = '';
    this.courseError = '';
    const modal = new bootstrap.Modal(document.getElementById('coursesModal'));
    modal.show();
  }

  addCourse() {
    if (this.isAddingCourse) return;
    this.courseError = '';

    if (!this.newCourseTitle.trim()) {
      this.courseError = 'Course title is required.';
      return;
    }

    if (!this.isValidUrl(this.newCourseLink)) {
      this.courseError = 'Please enter a valid URL.';
      return;
    }

    const newCourse = {
      title: this.newCourseTitle,
      content: this.newCourseLink,
    };

    this.isAddingCourse = true;
    this.trainingService.createCourse(this.selectedTraining.id, newCourse).subscribe(
      (response) => {
        // ✅ Fix: initialize if undefined
        if (!this.selectedTraining.courses) {
          this.selectedTraining.courses = [];
        }

        this.selectedTraining.courses.push(response);
        this.newCourseTitle = '';
        this.newCourseLink = '';
        this.isAddingCourse = false;
      },
      (error) => {
        this.courseError = 'Failed to add course. Try again.';
        this.isAddingCourse = false;
      }
    );
  }


  isValidUrl(url: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' +
      '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' +
      '(\\#[-a-zA-Z\\d_]*)?$', 'i'
    );
    return !!pattern.test(url);
  }

  deleteCourse(courseId: number) {
    if (!confirm('Are you sure you want to delete this course?')) return;

    this.trainingService.deleteCourse(courseId).subscribe(
      () => {
        this.selectedTraining.courses = this.selectedTraining.courses.filter((course: { id: number; }) => course.id !== courseId);
      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  deleteTraining(id: number) {
    if (!confirm('Are you sure you want to delete this training?')) return;

    this.trainingService.deleteTraining(id).subscribe(
      () => {
        this.filteredTrainings = this.filteredTrainings.filter((training: { id: number; }) => training.id !== id);
      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  downloadPlanning(training: any) {
    this.selectedTraining = { ...training };
    console.log(this.selectedTraining);

    const modal = new bootstrap.Modal(document.getElementById('planningsModal'));
    modal.show();
  }

  downloadPlanningPDF(planning: any) {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('Training Planning Overview', 14, 20);

    // Basic Info
    doc.setFontSize(12);
    doc.text(`Title: ${planning.title || 'N/A'}`, 14, 30);
    doc.text(`Planning Type: ${planning.planningType}`, 14, 37);
    doc.text(`Start Date: ${new Date(planning.startDate).toLocaleDateString()}`, 14, 44);
    doc.text(`End Date: ${new Date(planning.endDate).toLocaleDateString()}`, 14, 51);

    let currentY = 60;

    // If there are planningDays
    if (planning.planningDays && planning.planningDays.length > 0) {
      const rows = planning.planningDays.map((day: any) => [
        new Date(day.day).toLocaleDateString(),
        day.dayType,
        day.description || '',
        day.startTime,
        day.endTime

      ]);

      autoTable(doc, {
        startY: currentY,
        head: [['Date', 'Type','Description', 'Start Time', 'End Time']],
        body: rows,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [63, 81, 181] }
      });

      currentY = (doc as any).lastAutoTable.finalY + 10;
    } else {
      doc.setFontSize(12);
      doc.text('No planning days available.', 14, currentY);
    }

    // Save the PDF
    doc.save(`Planning_${planning.title || 'export'}.pdf`);
  }
}
