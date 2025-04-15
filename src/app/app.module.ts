
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/module/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,





  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgApexchartsModule,
    ToastrModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 60,
      outerStrokeWidth: 8,
      innerStrokeWidth: 4,
      outerStrokeColor: "#4882c2",
      innerStrokeColor: "#e7e8ea",
      animationDuration: 300,
      showTitle: false,
      showUnits: true,
      showSubtitle: false,
      units: '%',
    }),


      ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
