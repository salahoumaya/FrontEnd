import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/shared/service/reclamation/reclamation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-reclamation',
  templateUrl: './create-reclamations.component.html',
  styleUrls: ['./create-reclamations.component.scss']
})
export class CreateReclamationComponent implements OnInit {

  reclamation = {
    type: '',
    targetId: null,
    title: '',
    description: ''
  };

  events: any[] = [];
  trainings: any[] = [];
  sujetsPFE: any[] = [];

  constructor(private reclamationService: ReclamationService,private router: Router) {}

  ngOnInit() {}

  onTypeChange() {
    this.reclamation.targetId = null;  // reset l'ancienne valeur

    if (this.reclamation.type === 'EVENT') {
      this.reclamationService.getEvents().subscribe(data => this.events = data);
    } else if (this.reclamation.type === 'TRAINING') {
      this.reclamationService.getTrainings().subscribe(data => this.trainings = data);
    } else if (this.reclamation.type === 'SUJET_PFE') {
      this.reclamationService.getAllSujets().subscribe(data => this.sujetsPFE = data);
    }
}

submitReclamation() {
    if (!this.reclamation.type || !this.reclamation.targetId || !this.reclamation.title || !this.reclamation.description) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    const data = {
      type: this.reclamation.type,
      targetId: Number(this.reclamation.targetId), // ✅ assure que c'est bien un nombre
      title: this.reclamation.title,
      description: this.reclamation.description
    };

    this.reclamationService.createReclamation(data).subscribe({
      next: (res) => {
        console.log('Réclamation créée:', res);
        alert('Réclamation créée avec succès');
        this.router.navigate(['/student/student-reclamation']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la création de la réclamation');
      }
    });
}
}
