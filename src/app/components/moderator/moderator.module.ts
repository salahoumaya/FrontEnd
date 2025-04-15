import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { ModeratorComponent } from './moderator/moderator.component';
import { ModeratorSidebarComponent } from './moderator-sidebar/moderator-sidebar.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CourseListComponent } from './course-list/course-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SupportComponent } from './support/support.component';
import { ListsujetsModeratorComponent } from './listsujets-moderator/listsujets-moderator.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { FormationComponent } from './formation/formation.component';
import { ExamenComponent } from './examen/examen.component';



@NgModule({
  declarations: [ 
    DiplomeComponent,
    FormationComponent,
    ExamenComponent,
     ModeratorComponent,
    ModeratorSidebarComponent,
    AddCourseComponent,
    CourseListComponent,
    CheckoutComponent,
    SupportComponent,
    ListsujetsModeratorComponent,

    ModeratorDashboardComponent],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,

    FormsModule,
    NgApexchartsModule,

  ]
})
export class ModeratorModule { }
