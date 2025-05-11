import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeratorComponent } from './moderator/moderator.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SupportComponent } from './support/support.component';
import { ListsujetsModeratorComponent } from './listsujets-moderator/listsujets-moderator.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { FormationComponent } from './formation/formation.component';
import { ExamenComponent } from './examen/examen.component';


const routes: Routes = [{


  path: '',
  component: ModeratorComponent,
  children: [
    { path: 'dashboard', component: ModeratorDashboardComponent },
    { path: 'addCourse', component: AddCourseComponent },
    { path: 'CourseList', component:CourseListComponent },
    { path: 'Checkout', component:CheckoutComponent },
    { path: 'support', component:SupportComponent },
    { path: 'listesujet', component:ListsujetsModeratorComponent },
    {
        path: 'diplome',
        component: DiplomeComponent,
      },
      {
        path: 'Examens',
        component: FormationComponent,
      },
      {
        path: 'examen/:id',
        component: ExamenComponent,
      },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
