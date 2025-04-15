import { CreateReclamationComponent } from './reclamation/create-reclamations/create-reclamations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentMessageComponent } from './student-message/student-message.component';
import { StudentOrderHistoryComponent } from './student-order-history/student-order-history.component';
import { RouterModule } from '@angular/router';
import { StudentQaComponent } from './student-qa/student-qa.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentWishlistComponent } from './student-wishlist/student-wishlist.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentQuizComponent } from './student-quiz/student-quiz.component';
import { StudentReviewsComponent } from './student-reviews/student-reviews.component';
import { StudentReferralComponent } from './student-referral/student-referral.component';
import { StudentTicketsComponent } from './student-tickets/student-tickets.component';
import { StudentQuizDetailsComponent } from './student-quiz-details/student-quiz-details.component';
import { TestSelectionComponent } from './tests/test-selection/test-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestAttemptComponent } from './tests/test-attempt/test-attempt.component';
import { MesReclamationsComponent } from './reclamation/mes-reclamations/mes-reclamations.component';
import { TestResultComponent } from './tests/test-result/test-result.component';
import { EventListComponent } from './event-list/event-list.component';
import { AfficheReservationComponent } from './affiche-reservation/affiche-reservation.component';
import { SujetpfeFrontoffice } from './sujetpfe-frontoffice/sujetpfe-frontoffice.component';
import { ExmanComponent } from './exman/exman.component';
import { ListeComponent } from './liste/liste.component';




@NgModule({
  declarations: [
    ListeComponent,
    StudentComponent,
    ExmanComponent,
    StudentDashboardComponent,
    StudentMessageComponent,
    StudentOrderHistoryComponent,
    StudentQaComponent,
    StudentProfileComponent,
    StudentCoursesComponent,
    StudentQuizComponent,
    StudentWishlistComponent,
    StudentReviewsComponent,
    StudentReferralComponent,
    StudentTicketsComponent,
    StudentQuizDetailsComponent,
    TestSelectionComponent,
    TestAttemptComponent,
    MesReclamationsComponent,
    CreateReclamationComponent,
    TestResultComponent,
    EventListComponent,
    AfficheReservationComponent,
    SujetpfeFrontoffice

  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FeatherIconModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class StudentModule { }
