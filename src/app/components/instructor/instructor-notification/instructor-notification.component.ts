import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/shared/service/reclamation/adminreclamation.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-notification',
  templateUrl: './instructor-notification.component.html',
  styleUrls: ['./instructor-notification.component.scss']
})
export class InstructorNotificationComponent implements OnInit {

  public routes = routes;
  notifications: any[] = [];
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor(private reclamationService: ReclamationService) {
    const today = new Date();
    this.maxDate.setDate(today.getDate() + 7);
    this.bsRangeValue = [today, this.maxDate];
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.reclamationService.getAllReclamations().subscribe({
      next: (data) => {
        this.notifications = data.filter(r => r.status == 'OPEN'); // seulement les réclamations traitées
      },
      error: () => {
        alert('Erreur lors du chargement des notifications.');
      }
    });
  }

  markAllAsRead(): void {
    this.notifications = []; // pour le moment, juste vider la liste côté frontend
  }

  deleteAll(): void {
    this.notifications = [];
  }

  deleteNotification(index: number): void {
    this.notifications.splice(index, 1);
  }

}
