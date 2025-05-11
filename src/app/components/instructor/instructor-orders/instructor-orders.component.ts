import {Component, OnInit} from '@angular/core';
import {SujetPfe} from "../../../models/sujetpfe";
import {ActivatedRoute, Router} from "@angular/router";
import {SujetPfeService} from "../../../shared/service/sujetPfe/sujetpfe.service";
import {ToastrService} from "ngx-toastr";
import {OurUsers} from "../../../models/users";
@Component({
  selector: 'app-instructor-orders',
  templateUrl: './instructor-orders.component.html',
  styleUrls: ['./instructor-orders.component.scss']
})
export class InstructorOrdersComponent  {
  sujetPfe!: SujetPfe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sujetPfeService: SujetPfeService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    const sujetId = this.route.snapshot.paramMap.get('id');
    if (sujetId) {
      this.sujetPfeService.getSujetById(+sujetId).subscribe((sujet) => {
        this.sujetPfe = sujet;

        // Récupérer les demandeurs associés
        this.sujetPfeService.getDemandeurs(+sujetId).subscribe((demandeurs) => {
          this.sujetPfe.demandeurs = demandeurs;
        });
      });
    }
  }


  accepterDemande(demandeur: OurUsers) {
    if (this.sujetPfe && this.sujetPfe.id) {
      this.sujetPfeService.accepterPostulation(this.sujetPfe.id, demandeur.id).subscribe({
        next: (updatedSujet) => {
          this.sujetPfe = updatedSujet;
          this.toastr.success(`Le sujet a été attribué à ${demandeur.name}`, 'Succès', {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true,
            toastClass: 'toast-success-custom'
          });
        },
        error: () => {
          this.toastr.error('Cette etudiant est accepté dans un autre sujet.', 'Erreur', {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true
          });
        }
      });
    }
  }

  refuserDemande(demandeur: OurUsers) {
    if (this.sujetPfe && this.sujetPfe.id) {
      this.sujetPfeService.refuserPostulation(this.sujetPfe.id, demandeur.id).subscribe({
        next: (updatedSujet) => {
          this.sujetPfe = updatedSujet;
          this.toastr.success(`La demande de ${demandeur.name} a été refusée.`, 'Succès', {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true
          });
        },
        error: () => {
          this.toastr.error('Erreur lors du refus de la demande.', 'Erreur', {
            positionClass: 'toast-top-right',
            timeOut: 5000,
            progressBar: true
          });
        }
      });
    }
  }
}





