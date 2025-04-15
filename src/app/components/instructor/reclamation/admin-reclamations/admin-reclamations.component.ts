import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/shared/service/reclamation/adminreclamation.service';

@Component({
  selector: 'app-admin-reclamations',
  templateUrl: './admin-reclamations.component.html',
  styleUrls: ['./admin-reclamations.component.scss']
})
export class AdminReclamationsComponent implements OnInit {
  types = ['EVENT', 'TRAINING', 'SUJET_PFE'];
  reclamations: any[] = [];
  selectedReclamation: any = null;
  pageSize = 5;
  pageIndex: { [key: string]: number } = {};
  filters: { [key: string]: string } = {};
  dateFilters: { [key: string]: string } = {};
  showAutoProcessedOnly = false;



  constructor(private adminReclamationService: ReclamationService) {}

  ngOnInit(): void {

    this.loadReclamations();
    this.types.forEach(type => {
      this.pageIndex[type] = 0;
      this.filters[type] = '';
      this.dateFilters[type] = '';  // Init du filtre date
    });

  }

  loadReclamations() {
    this.adminReclamationService.getAllReclamations().subscribe(data => {
      this.reclamations = data.map(r => ({ ...r, newStatus: r.status }));
    });
  }

  getFilteredReclamations(type: string) {
    return this.reclamations
      .filter(r =>
        r.type === type &&
        (!this.filters[type] || r.title?.toLowerCase().includes(this.filters[type].toLowerCase()) || r.user?.email?.toLowerCase().includes(this.filters[type].toLowerCase())) &&
        (!this.dateFilters[type] || r.creationDate?.startsWith(this.dateFilters[type])) &&
        (!this.showAutoProcessedOnly || r.autoProcessed === true)
      )
      .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
      .slice(this.pageIndex[type] * this.pageSize, (this.pageIndex[type] + 1) * this.pageSize);
  }


  totalPages(type: string) {
    return Math.ceil(this.reclamations.filter(r => r.type === type && (r.title?.toLowerCase().includes(this.filters[type].toLowerCase()) || r.user?.email?.toLowerCase().includes(this.filters[type].toLowerCase()))).length / this.pageSize) || 1;
  }

  prevPage(type: string) { if (this.pageIndex[type] > 0) this.pageIndex[type]--; }

  nextPage(type: string) { if (this.pageIndex[type] + 1 < this.totalPages(type)) this.pageIndex[type]++; }

  selectReclamation(reclamation: any) { this.selectedReclamation = { ...reclamation }; }

  validateReclamation() {
    this.adminReclamationService.updateReclamation(
      this.selectedReclamation.id,
      this.selectedReclamation.newStatus,
      this.selectedReclamation.responseMessage
    ).subscribe(() => {
      alert('Réclamation mise à jour');
      this.selectedReclamation = null;
      this.loadReclamations();
    });
  }

  deleteReclamation(id: number) {
    if (confirm('Confirmer la suppression ?')) {
      this.adminReclamationService.deleteReclamation(id).subscribe(() => {
        this.loadReclamations();
      });
    }
  }

  statusClass(status: string) {
    return {
      'badge-primary': status === 'OPEN',
      'badge-warning': status === 'IN_PROGRESS',
      'badge-success': status === 'RESOLVED',
      'badge-danger': status === 'REJECTED'
    };
  }
  toggleAutoProcessedFilter() {
    this.showAutoProcessedOnly = !this.showAutoProcessedOnly;
  }

}
