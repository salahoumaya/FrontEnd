import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ModeratorSidebarComponent } from './moderator-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ModeratorSidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [ModeratorSidebarComponent],
})
export class ModeratorSidebarModule {}
