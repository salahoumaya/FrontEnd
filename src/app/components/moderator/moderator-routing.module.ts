import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ModeratorComponent } from './moderator.component';

const routes: Routes = [
  {
    path: '',
    component: ModeratorComponent,
    children: [
      {
        path: 'moderator-chat',
        component: InstructorChatComponent,
      },
      {
        path: 'moderator-course',
        component: InstructorCourseComponent,
      },
      {
        path: 'moderator-dashboard',
        component: InstructorDashboardComponent,
      },
      {
        path: 'moderator-earnings',
        component: InstructorEarningsComponent,
      },
      {
        path: 'moderator-notification',
        component: InstructorNotificationComponent,
      },
      {
        path: 'moderator-orders',
        component: InstructorOrdersComponent,
      },
      {
        path: 'moderator-profile',
        component: InstructorProfileComponent,
      },

      {
        path: 'moderator-tickets',
        component: InstructorTicketsComponent,
      },
      ////////
      {
        path: 'moderator-test-result/:id/submissions',
        component: AdminTestResultComponent,
    },
    { path: 'moderator-editTest/:id', component: TestFormComponent },

      {
        path: 'moderator-levelTest',
        component: TestListComponent,
      },
      {
        path: 'moderator-addTest',
        component: TestFormComponent,
      },
      {
        path: 'moderator-question',
        component: QuestionListComponent,
      },
      {
        path: 'moderator-addQuestions',
        component: QuestionFormComponent,
      },

      {
        path: 'moderator-view',
        loadChildren: () =>
          import('./instructor-view/instructor-view.module').then(
            (m) => m.InstructorViewModule
          ),
      },
      {
        path: 'moderator-edit',
        component: InstructorEditComponent,
      },
      {
        path: 'moderator-announcements',
        component: InstructorAnnouncementsComponent,
      },
      {
        path: 'moderator-assignment',
        component: InstructorAssignmentComponent,
      },
      {
        path: 'moderator-wishlist',
        component: InstructorWishlistComponent,
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      { path: 'moderator-withdraw', component: InstructorWithdrawComponent },

      {
        path: 'moderator-enrolled-course',
        component: InstructorEnrolledCourseComponent,
      },
      {
        path: 'moderator-qa',
        component: InstructorQaComponent,
      },
      {
        path: 'moderator-quiz',
        component: InstructorQuizComponent,
      },
      {
        path: 'moderator-quiz-attempts',
        component: InstructorQuizAttemptsComponent,
      },
      {
        path: 'moderator-quiz-attempts-details',
        component: InstructorQuizAttemptsDetailsComponent,
      },
      {
        path: 'moderator-referral',
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
