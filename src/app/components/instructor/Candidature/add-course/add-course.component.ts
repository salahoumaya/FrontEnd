import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'src/app/shared/service/candidature/candidature.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  candidatures: any[] = [];  // Liste des candidatures
  newCandidature: any = { nom: '', prenom: '', email: '', specialite: '', statut: 'EN_ATTENTE', nbr_exp: null };
  selectedCandidature: any = null;
  activeIndex: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  isClicked: boolean = false;

  constructor(private candidatureService: CandidatureService, private router: Router) { }

  ngOnInit(): void {
    this.loadCandidatures();
  }

  loadCandidatures() {
    this.candidatureService.getCandidatures().subscribe(
      (response) => {
        this.candidatures = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des candidatures', error);
        if (error.status === 403) {
          this.errorMessage = "Vous n'avez pas l'autorisation d'afficher les candidatures.";
        } else {
          this.errorMessage = 'Impossible de charger les candidatures, veuillez réessayer.';
        }
      }
    );
  }

  onSubmit(form: any) {
    if (this.isValidCandidature(this.newCandidature)) {
      this.isClicked = true;

      this.candidatureService.addCandidature(this.newCandidature).subscribe(
        (response) => {
          console.log('✅ Candidature envoyée avec succès', response);
          this.successMessage = 'Candidature envoyée avec succès !';
          this.errorMessage = '';

          // Réinitialiser le formulaire
          this.newCandidature = { nom: '', prenom: '', email: '', specialite: '', statut: 'EN_ATTENTE', nbr_exp: null };
          form.resetForm();
          this.resetButtonColor();

          // Rediriger vers la page d'entretien sans ID
          this.router.navigate(['/instructor/candidature']); // Redirection vers la page d'entretien
        },
        (error) => {
          console.error('❌ Erreur lors de l\'ajout de la candidature', error);
          this.successMessage = '';
          this.errorMessage = 'Une erreur est survenue lors de l\'ajout de la candidature.';
          this.resetButtonColor();
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
    }
  }

  isValidCandidature(candidature: any): boolean {
    return candidature.nom && candidature.prenom && candidature.email && candidature.specialite && candidature.statut && candidature.nbr_exp !== null;
  }

  resetButtonColor() {
    setTimeout(() => {
      this.isClicked = false;
    }, 1000);
  }
}
