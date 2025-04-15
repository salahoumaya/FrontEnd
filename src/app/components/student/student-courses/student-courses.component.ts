import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

import { TrainingService } from 'src/app/shared/service/TrainingPlan/training.service';
declare var bootstrap: any;
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-student-courses',

  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.scss'
})
export class StudentCoursesComponent {
  courses: any[] = [];
  filteredCourses: any[] = [];
  displayedCourses: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  searchDataValue: string = '';
  selectedTypes: string[] = [];
  routes = routes ;
  selectedTraining: any = null;
  isSubscribing: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.isLoading = true;
    this.trainingService.getTrainingsForAuthenticatedSTUDENT().subscribe(
      (data) => {
        this.courses = data;
        this.filteredCourses = data;
        this.updatePagination();
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load courses. Please try again.';
        this.isLoading = false;
      }
    );
  }

  searchData() {
    this.filterCourses();
  }

  toggleTypeFilter(type: string) {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
    this.filterCourses();
  }

  filterCourses() {
    let filtered = this.courses;

    // Apply search filter
    if (this.searchDataValue.trim()) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(this.searchDataValue.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchDataValue.toLowerCase())
      );
    }

    // Apply type filter
    if (this.selectedTypes.length > 0) {
      filtered = filtered.filter(course => this.selectedTypes.includes(course.typeTraning));
    }

    this.filteredCourses = filtered;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredCourses.length / this.itemsPerPage);
    this.displayedCourses = this.filteredCourses.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
  openSubscribeModal(training: any) {
    this.selectedTraining = training;
    const modal = new bootstrap.Modal(document.getElementById('subscribeModal'));
    modal.show();
  }

  confirmSubscription() {
    if (!this.selectedTraining || this.isSubscribing) return;

    this.isSubscribing = true;

    this.trainingService.subscribeToTraining(this.selectedTraining.id).subscribe(
      (response) => {
        console.log('Subscription successful:', response);
        this.isSubscribing = false;

        const modal = bootstrap.Modal.getInstance(document.getElementById('subscribeModal'));
        modal.hide();

        this.fetchCourses();

        console.log(this.selectedTraining);

        // ✅ Correction ici :
        if (this.selectedTraining.plannings?.length > 0) {
          this.downloadPlanningPDF(this.selectedTraining.plannings[0]);
        }
      },
      (error) => {
        console.error('Subscription failed:', error);
        this.isSubscribing = false;
      }
    );
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

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

    }}
