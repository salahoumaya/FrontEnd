import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EntretienService } from 'src/app/shared/service/Entretien/entretien.service';
import { Router } from '@angular/router';
import { EventClickArg } from '@fullcalendar/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this)
  };
  loading: boolean = false;

  newEntretien: any = { dateEntretien: '', lieu: '', note: '', type: 'TECHNIQUE' };
  errorMessage: string = '';
  successMessage: string = '';
  isClicked: boolean = false;

  constructor(
    private entretienService: EntretienService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.entretienService.getEntretiens().subscribe(
      (data) => {
        this.calendarOptions.events = data.map((event: any) => ({
          title: `Entretien à ${event.lieu}`,
          start: event.dateEntretien,
          description: event.note || 'Pas de notes',
          extendedProps: {
            id: event.entretienId,
            type: event.type
          }
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des entretiens', error);
        if (error.status === 403) {
          this.errorMessage = "Vous n'avez pas l'autorisation d'afficher les entretiens.";
        } else {
          this.errorMessage = 'Impossible de charger les entretiens, veuillez réessayer.';
        }
      }
    );
  }


  handleDateClick(arg: any) {
    const dateStr = arg.dateStr;
    this.newEntretien.dateEntretien = `${dateStr}T00:00:00`;

    const lieu = prompt('Entrez le lieu de l\'entretien');
    if (lieu) {
      this.newEntretien.lieu = lieu;
      this.newEntretien.note = prompt('Notes (optionnel)') || '';

      this.addEntretien();
    }
  }


  addEntretien() {
    if (this.isValidEntretien(this.newEntretien)) {
      this.isClicked = true;
      this.loading = true;

      this.entretienService.addEntretien(this.newEntretien).subscribe(
        (response) => {
          console.log('✅ Entretien ajouté avec succès', response);
          this.successMessage = 'Entretien ajouté avec succès !';
          this.errorMessage = '';

          this.newEntretien = { dateEntretien: '', lieu: '', note: '', type: 'PRESENTIEL' };
          this.loadEvents();
          this.resetButtonColor();
          this.loading = false;
        },
        (error) => {
          console.error('❌ Erreur lors de l\'ajout de l\'entretien', error);
          this.successMessage = '';
          this.errorMessage = 'Une erreur est survenue lors de l\'ajout de l\'entretien.';
          this.resetButtonColor();
          this.loading = false;
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
    }
  }


  handleEventClick(arg: EventClickArg) {
    const action = prompt(`Entretien à ${arg.event.title}\nTapez:\n- "d" pour détails\n- "m" pour modifier\n- "s" pour supprimer`);

    const eventId = arg.event.extendedProps['id'];

    if (action === 'd') {
      this.router.navigate(['/entretien/detail', eventId]);
    } else if (action === 'm') {
      const newLieu = prompt('Nouveau lieu :', arg.event.extendedProps['lieu']) || arg.event.extendedProps['lieu'];
      const newNote = prompt('Nouvelle note :', arg.event.extendedProps['note']) || '';

      const modifiedEntretien = {
        entretienId: eventId,
        dateEntretien: arg.event.startStr,
        lieu: newLieu,
        note: newNote,
        type: arg.event.extendedProps['type']
      };

      this.entretienService.modifyEntretien(modifiedEntretien).subscribe(
        () => {
          this.successMessage = 'Entretien modifié avec succès !';
          this.loadEvents();
        },
        (error) => {
          console.error('Erreur modification :', error);
          this.errorMessage = 'Erreur lors de la modification.';
        }
      );
    } else if (action === 's') {
      const confirmDelete = confirm('Voulez-vous vraiment supprimer cet entretien ?');
      if (confirmDelete) {
        this.entretienService.removeEntretien(eventId).subscribe(
          () => {
            this.successMessage = 'Entretien supprimé avec succès !';
            this.loadEvents();
          },
          (error) => {
            console.error('Erreur suppression :', error);
            this.errorMessage = 'Erreur lors de la suppression.';
          }
        );
      }
    }
  }

  isValidEntretien(entretien: any): boolean {
    return entretien.dateEntretien && entretien.lieu;
  }

  resetButtonColor() {
    setTimeout(() => {
      this.isClicked = false;
    }, 1000);
  }
}

