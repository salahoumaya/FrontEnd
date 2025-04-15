import { Component, OnInit } from '@angular/core';
import { DemandeStatus, SujetPfe } from 'src/app/models/sujetpfe';
import { SujetPfeService } from 'src/app/shared/service/sujetPfe/sujetpfe.service';
import { OuruserService } from 'src/app/shared/service/sujetPfe/ouruser.service';

declare var bootstrap: any;

@Component({
  selector: 'app-instructor-course',
  templateUrl: './sujetpfe-backoffice.component.html',
  styleUrls: ['./sujetpfe-backoffice.component.scss'],
})
export class SujetpfeBackofficeComponent implements OnInit {
  sujets: SujetPfe[] = [];  // Liste des sujets
  selectedSujet!: SujetPfe; // Sujet en cours d'édition
  selectedImage: string | ArrayBuffer | null = null;
  moderators: any[] = []; // Liste des modérateurs
  newSujet: SujetPfe = {
    titre: '',
    description: '',
    technologie: '',
    image: '',
    demandeStatus: DemandeStatus.PENDING,
    moderator: null,
    userAttribue: null,
    demandeurs: []
  };
  // ✅ Variables pour les statistiques
totalSujets: number = 0;
sujetsAttribues: number = 0;
sujetsNonAttribues: number = 0;

  pourcentageAttribues: number = 0; // Pourcentage des sujets attribués

  constructor(private sujetPfeService: SujetPfeService, private ourUserService: OuruserService) {}

  ngOnInit(): void {
    this.loadSujets();
    this.loadModerators();
    this.loadPourcentageAttribues();
  }

  loadSujets(): void {
    this.sujetPfeService.getAllSujets().subscribe((data) => {
      this.sujets = data;
      console.log("Liste des sujets : ", data);
      // ✅ Calcul des statistiques
this.totalSujets = data.length;
this.sujetsAttribues = data.filter(s => s.userAttribue != null).length;
this.sujetsNonAttribues = this.totalSujets - this.sujetsAttribues;
    });
  }

  loadPourcentageAttribues(): void {
    this.sujetPfeService.getPourcentageSujetsAttribues().subscribe((pourcentage: number) => {
      this.pourcentageAttribues = pourcentage;
      console.log("Pourcentage des sujets attribués :", pourcentage);

    }, error => {
      console.error("Erreur lors de la récupération du pourcentage :", error);
    });

  }

  openEditModal(sujet: SujetPfe): void {
    this.selectedSujet = { ...sujet };
    const modalElement = document.getElementById('editSujetModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  updateSujet(): void {
    if (!this.selectedSujet || this.selectedSujet.id === undefined) return;

    // Validation de la saisie avant mise à jour
    if (this.selectedSujet.titre.trim() === '' || this.selectedSujet.description.trim() === '' || this.selectedSujet.technologie.trim() === '') {
      alert("Tous les champs doivent être remplis.");
      return;
    }
    if (this.selectedSujet.titre.length < 3 || this.selectedSujet.titre.length > 100) {
      alert("Le titre doit comporter entre 3 et 100 caractères.");
      return;
    }
    if (this.selectedSujet.description.length < 10 || this.selectedSujet.description.length > 500) {
      alert("La description doit comporter entre 10 et 500 caractères.");
      return;
    }

    this.sujetPfeService.modifierSujet(this.selectedSujet.id, this.selectedSujet)
      .subscribe(() => {
        if (this.selectedSujet.moderator && this.selectedSujet.id) {
          this.sujetPfeService.affecterModerateur(this.selectedSujet.id, this.selectedSujet.moderator.id)
            .subscribe(() => {
              this.loadSujets();  // Recharger la liste des sujets
              this.closeEditModal();
            });
        } else {
          this.loadSujets();
          this.closeEditModal();
        }
      });
  }

  closeEditModal(): void {
    const modalElement = document.getElementById('editSujetModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  openDeleteModal(sujet: SujetPfe): void {
    this.selectedSujet = sujet;
    const modalElement = document.getElementById('deleteSujetModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteSujet(): void {
    if (!this.selectedSujet || this.selectedSujet.id === undefined) return;

    this.sujetPfeService.supprimerSujet(this.selectedSujet.id).subscribe(() => {
      this.sujets = this.sujets.filter(s => s.id !== this.selectedSujet!.id);
      this.closeDeleteModal();
    });
  }

  closeDeleteModal(): void {
    const modalElement = document.getElementById('deleteSujetModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  onFileSelectedAjout(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file.name; // Le nom du fichier sans chemin complet
      if (this.newSujet) {
        this.newSujet.image = file.name;
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file.name; // Le nom du fichier sans chemin complet
      if (this.selectedSujet) {
        this.selectedSujet.image = file.name;
      }
    }
  }

  openAddModal() {
    this.newSujet = {
      titre: '',
      description: '',
      technologie: '',
      image: '',
      demandeStatus: DemandeStatus.PENDING,
      moderator: null,
      userAttribue: null,
      demandeurs: []
    };

    const modal = new bootstrap.Modal(document.getElementById('addSujetModal'));
    modal.show();
  }

  addSujet() {
    // Validation de la saisie avant ajout
    if (this.newSujet.titre.trim() === '' || this.newSujet.description.trim() === '' || this.newSujet.technologie.trim() === '') {
      alert("Tous les champs doivent être remplis.");
      return;
    }
    if (this.newSujet.titre.length < 3 || this.newSujet.titre.length > 100) {
      alert("Le titre doit comporter entre 3 et 100 caractères.");
      return;
    }
    if (this.newSujet.description.length < 10 || this.newSujet.description.length > 500) {
      alert("La description doit comporter entre 10 et 500 caractères.");
      return;
    }

    this.sujetPfeService.ajouterSujet(this.newSujet).subscribe((sujetAjoute) => {
      if (this.newSujet.moderator && sujetAjoute.id) {
        this.sujetPfeService.affecterModerateur(sujetAjoute.id, this.newSujet.moderator.id)
          .subscribe(() => {
            this.loadSujets();
            this.closeAddModal();
          });
      } else {
        this.loadSujets();
        this.closeAddModal();
      }
    });
  }

  closeAddModal(): void {
    const modalElement = document.getElementById('addSujetModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  loadModerators(): void {
    this.ourUserService.getAllModerators().subscribe((data) => {
      this.moderators = data;
    });
  }
}
