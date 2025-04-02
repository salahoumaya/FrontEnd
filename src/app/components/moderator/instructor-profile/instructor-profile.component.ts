import { Component } from '@angular/core';
import { instructorProfile, instructorProfileEducation, instructorProfileExperience, instructorProfileCourses, instructorProfileReviews, instructorProfileOverview, instructorProfileContactDetails } from 'src/app/models/model';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';
interface data {
  active?:boolean;
}
@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.scss']
})
export class InstructorProfileComponent  {
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
