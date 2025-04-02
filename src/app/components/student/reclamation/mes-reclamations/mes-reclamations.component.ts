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
  isLoading = true;
  errorMessage = '';
  selectedReclamation: any = null;
  statusReclamation: any = null; // ✅ Nouveau

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reclamationService.getMyReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors du chargement :", err);
        this.isLoading = false;
      }
    });
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
