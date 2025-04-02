import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';

import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-sidebar',
  templateUrl: './instructor-sidebar.component.html',
  styleUrls: ['./instructor-sidebar.component.scss'],
})
export class InstructorSidebarComponent {
  public routes = routes;
  public base = '';
  public page = '';
  public last = '';

  // ✅ Variables pour le profil utilisateur
  public userName: string = 'Admin';
  public userPhoto: string = 'assets/img/user/default.jpg'; // Image par défaut

  constructor(private common: CommonService, private userService: AuthService) {
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });

    // ✅ Charger le profil utilisateur
    this.loadUserProfile();
  }

  // ✅ Charger les informations utilisateur depuis l'API
  loadUserProfile() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.userName = data.name || 'Admin';
        this.userPhoto = data.photoUrl || 'assets/img/user/default.jpg';
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil utilisateur:', err);
      },
    });
  }
}
