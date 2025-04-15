import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'src/app/shared/service/candidature/candidature.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  candidatures: any[] = []; // Liste des candidatures
  public errorMessage: string = '';
  public loading: boolean = true;

  constructor(private candidatureService: CandidatureService, private router: Router) {}

  ngOnInit(): void {
    this.loadCandidatures();
  }

  private loadCandidatures(): void {
    this.loading = true;
    this.candidatureService.getCandidatures().subscribe(
      data => {
        this.candidatures = data;
        this.loading = false; // Arrête le chargement après récupération des données
      },
      error => {
        console.error('Erreur lors du chargement des candidatures', error);
        this.errorMessage = 'Impossible de charger les candidatures. Veuillez réessayer plus tard.';
        this.loading = false; // Arrête le chargement en cas d'erreur
      }
    );
  }

  public sendConfirmationEmail(candidature: any): void {
    if (!candidature || !candidature.email) {
      console.error('Candidature ou email manquant.');
      return; // Arrêter la fonction si la candidature ou l'email est manquant
    }

    const email = candidature.email; // Récupère l'email de la candidature

    this.candidatureService.sendConfirmationEmail(email)
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de l'envoi de l'email à ${email}`, error);
          this.errorMessage = `Impossible d'envoyer l'email à ${email}.`;
          return of(null); // Évite d'interrompre la boucle
        })
      )
      .subscribe(response => {
        if (response) {
          console.log(`Email de confirmation envoyé à ${email}`);
          alert(`Email de confirmation envoyé à ${email}`);
        }
      });
  }

  public onUpdate(candidature: any): void {
    const id = candidature.candidatId;
    if (id) {
      this.router.navigate(['/instructor/modifiercandidature', id]);
    } else {
      console.error('ID de candidature non valide');
    }
  }

  public getCountByStatus(status: string): number {
    return this.candidatures.filter(c => c.statut === status).length;
  }

  public onDelete(candidatId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      this.candidatureService.removeCandidature(candidatId).subscribe(
        () => {
          this.candidatures = this.candidatures.filter(c => c.candidatId !== candidatId);
          alert('Candidature supprimée avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression de la candidature', error);
          this.errorMessage = 'Impossible de supprimer la candidature. Veuillez réessayer plus tard.';
        }
      );
    }
  }

  public downloadCandidaturePdf(): void {
    this.candidatureService.downloadPdf().subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'candidatures.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        console.log('Téléchargement terminé.');
      },
      error => {
        console.error('Erreur lors du téléchargement du PDF', error);
        this.errorMessage = 'Impossible de télécharger le PDF. Veuillez réessayer plus tard.';
      }
    );
  }
}
