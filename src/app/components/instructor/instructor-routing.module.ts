import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorAssignmentComponent } from './instructor-assignment/instructor-assignment.component';
import { InstructorWishlistComponent } from './instructor-wishlist/instructor-wishlist.component';
import { InstructorAnnouncementsComponent } from './instructor-announcements/instructor-announcements.component';
import { InstructorWithdrawComponent } from './instructor-withdraw/instructor-withdraw.component';
import { InstructorEnrolledCourseComponent } from './instructor-enrolled-course/instructor-enrolled-course.component';
import { InstructorQaComponent } from './instructor-qa/instructor-qa.component';
import { InstructorQuizComponent } from './instructor-quiz/instructor-quiz.component';
import { InstructorQuizAttemptsComponent } from './instructor-quiz-attempts/instructor-quiz-attempts.component';
import { InstructorQuizAttemptsDetailsComponent } from './instructor-quiz-attempts-details/instructor-quiz-attempts-details.component';
import { InstructorReferralComponent } from './instructor-referral/instructor-referral.component';
import { InstructorTicketsComponent } from './instructor-tickets/instructor-tickets.component';
import { InstructorOrdersComponent } from './instructor-orders/instructor-orders.component';
import { InstructorChatComponent } from './instructor-chat/instructor-chat.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorEarningsComponent } from './instructor-earnings/instructor-earnings.component';
import { InstructorNotificationComponent } from './instructor-notification/instructor-notification.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';

import { InstructorEditComponent } from './instructor-edit/instructor-edit.component';
import { InstructorQuizDetailsComponent } from './instructor-quiz-details/instructor-quiz-details.component';

import { TestListComponent } from './tests/test-list/test-list.component';
import { TestFormComponent } from './tests/test-form/test-form.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { AdminTestResultComponent } from './tests/admin-test-result/admin-test-result.component';
import { AdminReclamationsComponent } from './reclamation/admin-reclamations/admin-reclamations.component';

import { AddEventComponent } from './evenement/add-event/add-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { SujetpfeBackofficeComponent } from './sujetpfe-backoffice/sujetpfe-backoffice.component';
import { CourseDetailsComponent } from './Candidature/course-details/course-details.component';
import { AddCourseComponent } from './Candidature/add-course/add-course.component';
import { StudentMessageComponent } from './Candidature/student-message/student-message.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { FormationComponent } from './formation/formation.component';
import { ExamenComponent } from './examen/examen.component';
import { ReclamationStatesComponent } from './reclamation/reclamation-states/reclamation-states.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      {
        path: 'instructor-chat',
        component: InstructorChatComponent,
      },
      {
        path: 'instructor-course',
        component: InstructorCourseComponent,
      },
      {
        path: 'instructor-dashboard',
        component: InstructorDashboardComponent,
      },
      {
        path: 'reclamationStates',
        component: ReclamationStatesComponent,
      },
      {
        path: 'instructor-earnings',
        component: InstructorEarningsComponent,
      },
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
      {
        path: 'instructor-notification',
        component: InstructorNotificationComponent,
      },
      {
        path: 'instructor-orders/:id',
        component: InstructorOrdersComponent,
      },
      {
        path: 'instructor-profile',
        component: InstructorProfileComponent,
      },

      {
        path: 'instructor-tickets',
        component: InstructorTicketsComponent,
      },
      ////////
      {
        path: 'instructor-test-result/:id/submissions',
        component: AdminTestResultComponent,
    },
    { path: 'instructor-editTest/:id', component: TestFormComponent },

      {
        path: 'instructor-levelTest',
        component: TestListComponent,
      },
      {
        path: 'instructor-reclamation',
        component: AdminReclamationsComponent,
      },
      {
        path: 'instructor-addTest',
        component: TestFormComponent,
      },
      {
        path: 'instructor-question',
        component: QuestionListComponent,
      },
      {
        path: 'instructor-addQuestions',
        component: QuestionFormComponent,
      },

      {
        path: 'instructor-view',
        loadChildren: () =>
          import('./instructor-view/instructor-view.module').then(
            (m) => m.InstructorViewModule
          ),
      },
      {
        path: 'instructor-edit',
        component: InstructorEditComponent,
      },
      {
        path: 'instructor-announcements',
        component: InstructorAnnouncementsComponent,
      },
      {
        path: 'instructor-assignment',
        component: InstructorAssignmentComponent,
      },
      {
        path: 'instructor-wishlist',
        component: InstructorWishlistComponent,
      },
      {
        path: 'list-sujet',
        component: SujetpfeBackofficeComponent,
      },
      {
        path: 'candidature',
        component: CourseDetailsComponent,
      },
      {
        path: 'addcandidature',
        component: AddCourseComponent,
      },

      {
        path: 'modifiercandidature/:id',
        component: StudentMessageComponent,
      },


      {
        path: 'updatevent/:id',
        component: UpdateEventComponent,
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      { path: 'instructor-withdraw', component: InstructorWithdrawComponent },

      {
        path: 'instructor-enrolled-course',
        component: InstructorEnrolledCourseComponent,
      },
      {
        path: 'instructor-qa',
        component: InstructorQaComponent,
      },
      {
        path: 'instructor-quiz',
        component: InstructorQuizComponent,
      },
      {
        path: 'instructor-quiz-attempts',
        component: InstructorQuizAttemptsComponent,
      },
      {
        path: 'instructor-quiz-attempts-details',
        component: InstructorQuizAttemptsDetailsComponent,
      },
      {
        path: 'instructor-referral',
        component: InstructorReferralComponent,
      },
      {
        path: 'instructor-quiz-details',
        component: InstructorQuizDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
