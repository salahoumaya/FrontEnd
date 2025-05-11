import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { BlogDetailsComponent } from './blog-details.component';
import { SharedModule } from "../../../shared/module/shared.module";
import { FullCalendarModule } from '@fullcalendar/angular';  // Import FullCalendar
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    BlogDetailsComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BlogDetailsRoutingModule,
    SharedModule,
    FullCalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Ajoute cette ligne
})
export class BlogDetailsModule { }
