import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatureService } from 'src/app/shared/service/candidature/candidature.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-message',
  templateUrl: './student-message.component.html',
  styleUrls: ['./student-message.component.scss']
})
export class StudentMessageComponent implements OnInit {
  candidatureId: number = 0; // Initialisé à une valeur par défaut
  candidature: any; // Remplacez par votre type spécifique

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatureService: CandidatureService
  ) {}

  ngOnInit(): void {
    this.candidatureId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCandidature();
  }

  private loadCandidature(): void {
    this.candidatureService.getCandidatureById(this.candidatureId).subscribe(
      data => {
        console.log('📌 Candidature récupérée:', data);
        this.candidature = data;
      },
      error => {
        console.error('❌ Erreur lors du chargement de la candidature', error);
        alert('Erreur lors du chargement de la candidature. Veuillez réessayer.');
      }
    );
  }

  public onSubmit(candidatureForm: NgForm): void {
    if (candidatureForm.valid) {
      console.log('📌 Candidature envoyée pour mise à jour:', this.candidature); // DEBUG

      this.candidatureService.modifyCandidature(this.candidature).subscribe(
        () => {
          alert('✅ Candidature mise à jour avec succès.');
          this.router.navigate(['/instructor/candidature']);
        },
        error => {
          console.error('❌ Erreur lors de la mise à jour de la candidature', error);
          alert('Erreur lors de la mise à jour de la candidature. Veuillez réessayer.');
        }
      );
    } else {
      alert('⚠️ Veuillez remplir tous les champs requis.');
    }
  }

  public onUpdate(candidature: any): void {
    console.log('Naviguer vers la mise à jour avec ID:', candidature.candidatId);
    this.router.navigate(['/student/student-message', candidature.candidatId]);
  }

  public goToCandidatureList(): void {
    this.router.navigate(['/instructor/candidature']);
  }

  // ✅ Ajoute cette méthode ici, à la fin de la classe
  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('📂 Fichier sélectionné :', file);
      // Ajoute ici la logique pour uploader le fichier
    } else {
      console.warn('❌ Aucun fichier sélectionné.');
    }
  }
}
