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
  public userName: string = '';
  public userImage: string = 'assets/img/user/default-avatar.png'; // Image par défaut

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        console.log('📥 Données utilisateur reçues:', response);
        this.userName = response.ourUsers.name || 'Utilisateur';
        this.userImage = response.ourUsers.image ? `data:image/png;base64,${response.ourUsers.image}` : this.userImage;
      },
      error: (error) => {
        console.log('❌ Erreur lors de la récupération du profil utilisateur:', error);
      }
    });
  }
}
