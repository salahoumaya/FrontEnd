/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType,Chart } from 'chart.js/auto';

import { routes } from 'src/app/shared/service/routes/routes';
import { TrainingService } from 'src/app/shared/service/TrainingPlan/training.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent  implements OnInit, AfterViewInit {
  public routes = routes;
  totalCourses =0 ;
  totalTrainings=0;
  totalStudents=0;
  myStudents: any[] = [];
  @ViewChild('subscribersChart') subscribersChartRef!: ElementRef;
  private chartInstance!: Chart;
  constructor(private trainingService: TrainingService) {
    }

  ngOnInit(): void {
    this.trainingService.getDashboardData().subscribe(
      (data) => {
        this.totalCourses = data.totalCourses;
        this.totalTrainings = data.totalTrainings;
        this.totalStudents= data.totalStudents;
        this.myStudents=data.myStudents;
        this.processChartData();
      },
      (error) => {
       console.log("Erreur "+error.response)
      }
    );

  }ngAfterViewInit(): void {
    this.initializeChart();
  }

  processChartData() {
    const dateCounts: { [key: string]: number } = {};
    this.myStudents.forEach(student => {
      const date = new Date(student.dateSubscription).toISOString().split('T')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    const sortedDates = Object.keys(dateCounts).sort();
    let cumulativeSum = 0;
    const cumulativeData = sortedDates.map(date => {
      cumulativeSum += dateCounts[date];
      return cumulativeSum;
    });
    this.updateChart(sortedDates, cumulativeData);
  }

  initializeChart() {
    if (!this.subscribersChartRef) return;

    this.chartInstance = new Chart(this.subscribersChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Subscribers Over Time',
          data: [],
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.3)',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'Total Subscribers' }, beginAtZero: true }
        }
      }
    });
  }

  updateChart(labels: string[], data: number[]) {
    if (this.chartInstance) {
      this.chartInstance.data.labels = labels;
      this.chartInstance.data.datasets[0].data = data;
      this.chartInstance.update();
    }
  }
}
