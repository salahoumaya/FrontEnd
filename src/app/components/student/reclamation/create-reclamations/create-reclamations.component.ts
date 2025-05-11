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
  automaticStatus: string | null = null;
  sentiment: string | null = null;  // Add a property to store sentiment
  events: any[] = [];
  trainings: any[] = [];
  sujetsPFE: any[] = [];

  constructor(private reclamationService: ReclamationService, private router: Router) {}

  ngOnInit() {}

  // Fonction qui est appelée lorsque le type de réclamation change
  onTypeChange() {
    this.reclamation.targetId = null; // Réinitialiser la valeur précédente
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
      targetId: Number(this.reclamation.targetId),
      title: this.reclamation.title,
      description: this.reclamation.description  // Pass the description correctly to the backend
    };

    this.reclamationService.createReclamation(data).subscribe({
      next: (res: any) => {
        this.automaticStatus = res.status || 'OPEN';
        this.sentiment = res.sentiment || 'No sentiment detected';  // Store sentiment in the component
        alert(`Réclamation créée avec le statut : ${res.status}`);

        if (res.autoProcessed) {
          alert(`✅ Réclamation traitée automatiquement avec le statut : ${res.status}`);
        } else {
          alert('Réclamation créée avec succès. Elle sera examinée prochainement.');
        }

        setTimeout(() => this.router.navigate(['/student/student-reclamation']), 3000);
      },
      error: () => {
        alert('Erreur lors de la création de la réclamation');
      }
    });
  }
}

