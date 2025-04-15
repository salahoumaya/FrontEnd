import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';

import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-moderator-sidebar',
  templateUrl: './moderator-sidebar.component.html',
  styleUrls: ['./moderator-sidebar.component.scss'],
})
export class ModeratorSidebarComponent {
  public routes = routes;
  public base = '';
  public page = '';
  public last = '';
  public userProfile: any = {};

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

  }
  ngOnInit(): void {
    this.loadUserProfile();
  }

  // ✅ Charger les informations utilisateur depuis l'API
  loadUserProfile() {
    this.userService.getProfile().subscribe({
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
