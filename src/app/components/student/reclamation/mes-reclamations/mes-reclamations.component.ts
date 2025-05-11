import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/shared/service/reclamation/reclamation.service';

@Component({
  selector: 'app-mes-reclamations',
  templateUrl: './mes-reclamations.component.html',
  styleUrls: ['./mes-reclamations.component.scss']
})
export class MesReclamationsComponent implements OnInit {
  reclamations: any[] = [];
  paginatedReclamations: any[] = [];
  isLoading = true;
  errorMessage = '';
  selectedReclamation: any = null;
  statusReclamation: any = null;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  pages: number[] = [];

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadReclamations();
  }

  loadReclamations() {
    this.isLoading = true;
    this.reclamationService.getMyReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
        this.updatePagination();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement :', err);
        this.errorMessage = 'Une erreur est survenue lors du chargement des réclamations.';
        this.isLoading = false;
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.reclamations.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReclamations = this.reclamations.slice(startIndex, endIndex);

    // Generate page numbers
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  goToCreateReclamation() {
    this.router.navigate(['/student/create-reclamation']);
  }

  showDetails(reclamation: any) {
    this.selectedReclamation = reclamation;
  }

  showStatus(reclamation: any) {
    this.statusReclamation = reclamation;
  }
}
