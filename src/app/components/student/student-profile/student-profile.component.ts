import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  public routes = routes;
  public userProfile: any = {};
  public loading: boolean = true;
  public errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile();  // Récupérer les informations utilisateur au chargement
  }

  // 🔹 Fonction pour récupérer les données utilisateur depuis le backend
  getUserProfile() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        console.log('📥 Détails de ourUsers :', response.ourUsers);

        this.userProfile = response.ourUsers;
        this.loading = false;
      },
      error: (error) => {
        console.log('❌ Erreur lors de la récupération des données utilisateur :', error);
        this.errorMessage = 'Impossible de charger les données utilisateur. Veuillez réessayer plus tard.';
        this.loading = false;
      }
    });
  }
}
