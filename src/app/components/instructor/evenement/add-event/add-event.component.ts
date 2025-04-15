import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, Event } from 'src/app/shared/service/evenement/event.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent implements OnInit {
  events: any[] = [];
  selectedEvent: Event | null = null;
  isEditing: boolean = false;
  public routes = routes;

  constructor(private eventService: EventService, private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getUpcomingEvents().subscribe(data => {
      this.events = data;
    });
  }

  addEvent(title: string, description: string, scheduledAt: string,capacity: string) {
    const newEvent: Event = { title, description, scheduledAt: new Date(scheduledAt),capacity: parseInt(capacity, 10) };
    this.eventService.addEvent(newEvent).subscribe(() => {
      this.loadEvents();
    });
  }

  deleteEvent(id?: number) {
    if (id && confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  editEvent(event: Event) {
    this.selectedEvent = { ...event }; // Clone l'événement sélectionné
    this.isEditing = true;
  }

 /*updateEvent() {
    if (this.selectedEvent) {
       //On met à jour l'événement avec les données modifiées
      this.eventService.updateEvent(this.selectedEvent).subscribe(() => {
        this.loadEvents();  // Recharge la liste des événements
        this.isEditing = false;  // Ferme la modale
        this.selectedEvent = null;  // Réinitialise la sélection
      });
   }
  }
*/
update_Stage(eventId: number) {
  this.router.navigate(['/instructor/updatevent', eventId]);
}

updateevent(id?: number) {
  if (id && confirm("Voulez-vous vraiment modifier cet événement ?")) {
    console.log(id);
    this.update_Stage(id);
    }
  }



  cancelEdit() {
    this.isEditing = false;  // Ferme la modale sans enregistrer
    this.selectedEvent = null;  // Réinitialise la sélection
  }

 goToAddTest() {
    this.router.navigate([this.routes.instructorUpdateEvent]);
  }

}
