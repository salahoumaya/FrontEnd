import { MesReclamationsComponent } from './reclamation/mes-reclamations/mes-reclamations.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentMessageComponent } from './student-message/student-message.component';
import { StudentQaComponent } from './student-qa/student-qa.component';
import { StudentQuizComponent } from './student-quiz/student-quiz.component';
import { StudentOrderHistoryComponent } from './student-order-history/student-order-history.component';
import { StudentWishlistComponent } from './student-wishlist/student-wishlist.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { StudentReviewsComponent } from './student-reviews/student-reviews.component';
import { StudentReferralComponent } from './student-referral/student-referral.component';
import { StudentTicketsComponent } from './student-tickets/student-tickets.component';
import { StudentQuizDetailsComponent } from './student-quiz-details/student-quiz-details.component';
import { TestSelectionComponent } from './tests/test-selection/test-selection.component';
import { TestAttemptComponent } from './tests/test-attempt/test-attempt.component';
import { CreateReclamationComponent } from './reclamation/create-reclamations/create-reclamations.component';
import { TestResultComponent } from './tests/test-result/test-result.component';
import { EventListComponent } from './event-list/event-list.component';
import { SujetpfeFrontoffice } from './sujetpfe-frontoffice/sujetpfe-frontoffice.component';
import { ExmanComponent } from './exman/exman.component';
import { ListeComponent } from './liste/liste.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      { path: 'student-test', component: TestSelectionComponent },
      { path: 'liste', component: ListeComponent },
      { path: 'examn/:id', component: ExmanComponent },
      { path: 'test-attempt/:id', component: TestAttemptComponent },
      { path: 'test-result/:id', component: TestResultComponent },


      {
        path: 'student-view',
        loadChildren: () =>
          import('./student-view/student-view.module').then(
            (m) => m.StudentViewModule
          ),
      },

      { path: 'student-profile', component: StudentProfileComponent },
      { path: 'student-dashboard', component: StudentDashboardComponent },
      { path: 'student-event', component: EventListComponent },
      { path: 'sujetpfe-user', component: SujetpfeFrontoffice },

      { path: 'student-reclamation',component: MesReclamationsComponent  },
      { path: 'create-reclamation',component: CreateReclamationComponent  },
      { path: 'view-invoice', component: ViewInvoiceComponent },
      { path: 'student-qa', component: StudentQaComponent },
      { path: 'student-quiz', component: StudentQuizComponent },
      { path: 'student-message', component: StudentMessageComponent },
      { path: 'student-order-history', component: StudentOrderHistoryComponent },
      { path: 'student-wishlist', component: StudentWishlistComponent },
      { path: 'student-courses', component: StudentCoursesComponent },
      { path: 'student-quiz-details', component: StudentQuizDetailsComponent },
      { path: 'student-reviews', component: StudentReviewsComponent },
      { path: 'student-referral', component: StudentReferralComponent },
      { path: 'student-tickets', component: StudentTicketsComponent },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
