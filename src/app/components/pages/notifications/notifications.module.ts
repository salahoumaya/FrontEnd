import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { ModeratorSidebarModule } from "../moderator-sidebar/moderator-sidebar.module";


@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    ModeratorSidebarModule
]
})
export class NotificationsModule { }
