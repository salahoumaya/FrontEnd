import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { InstructorAnnouncementsComponent } from './instructor-announcements/instructor-announcements.component';
import { InstructorAssignmentComponent } from './instructor-assignment/instructor-assignment.component';
import { InstructorWishlistComponent } from './instructor-wishlist/instructor-wishlist.component';
import { InstructorQaComponent } from './instructor-qa/instructor-qa.component';
import { InstructorQuizComponent } from './instructor-quiz/instructor-quiz.component';
import { InstructorQuizAttemptsComponent } from './instructor-quiz-attempts/instructor-quiz-attempts.component';
import { InstructorQuizAttemptsDetailsComponent } from './instructor-quiz-attempts-details/instructor-quiz-attempts-details.component';
import { InstructorReferralComponent } from './instructor-referral/instructor-referral.component';
import { InstructorWithdrawComponent } from './instructor-withdraw/instructor-withdraw.component';
import { InstructorTicketsComponent } from './instructor-tickets/instructor-tickets.component';
import { InstructorOrdersComponent } from './instructor-orders/instructor-orders.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorNotificationComponent } from './instructor-notification/instructor-notification.component';
import { InstructorEditComponent } from './instructor-edit/instructor-edit.component';
import { InstructorChatComponent } from './instructor-chat/instructor-chat.component';
import { InstructorEarningsComponent } from './instructor-earnings/instructor-earnings.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
import { RouterModule } from '@angular/router';
import { InstructorQuizDetailsComponent } from './instructor-quiz-details/instructor-quiz-details.component';
import { InstructorEnrolledCourseComponent } from './instructor-enrolled-course/instructor-enrolled-course.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestFormComponent } from './tests/test-form/test-form.component';

import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { AdminTestResultComponent } from './tests/admin-test-result/admin-test-result.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';



@NgModule({
  declarations: [
    InstructorComponent,
    InstructorAnnouncementsComponent,
    InstructorAssignmentComponent,
    InstructorWishlistComponent,
    InstructorQaComponent,
    InstructorQuizComponent,
    InstructorQuizAttemptsComponent,
    InstructorQuizAttemptsDetailsComponent,
    InstructorReferralComponent,
    InstructorWithdrawComponent,
    InstructorTicketsComponent,
    InstructorOrdersComponent,
    InstructorProfileComponent,
    InstructorNotificationComponent,
    InstructorEditComponent,
    InstructorChatComponent,
    InstructorEarningsComponent,
    InstructorDashboardComponent,
    InstructorCourseComponent,
    InstructorQuizDetailsComponent,
    InstructorEnrolledCourseComponent,
    TestFormComponent,
    TestListComponent,
    QuestionFormComponent,
    QuestionListComponent,
    AdminTestResultComponent





  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FeatherIconModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    NgApexchartsModule,
    NgCircleProgressModule.forRoot({
      // Configuration par défaut pour les graphiques circulaires
      radius: 60,
      outerStrokeWidth: 8,
      innerStrokeWidth: 4,
      outerStrokeColor: "#4882c2",
      innerStrokeColor: "#e7e8ea",
      animationDuration: 300
    })
  ],
})
export class InstructorModule { }
