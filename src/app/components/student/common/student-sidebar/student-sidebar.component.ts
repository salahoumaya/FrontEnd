import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.scss']
})
export class StudentSidebarComponent implements OnInit {
  public routes = routes;
  public userProfile: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        console.log('📥 Détails de ourUsers :', response.ourUsers);

        this.userProfile = response.ourUsers;

      },
      error: (error) => {
        console.log('❌ Erreur lors de la récupération des données utilisateur :', error);

      }
    });
  }
}
