/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexPlotOptions,
  ApexLegend,
  ApexYAxis,
  ApexFill,
  ApexGrid,
  ApexMarkers,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

import { bestSellingCourses } from 'src/app/models/model';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { ReclamationService } from 'src/app/shared/service/reclamation/adminreclamation.service';
import { TrainingService } from 'src/app/shared/service/TrainingPlan/training.service';
import { SujetPfeService } from 'src/app/shared/service/sujetPfe/sujetpfe.service';
import { SujetPfe } from 'src/app/models/sujetpfe';
import { ClusteringService } from 'src/app/shared/service/ClusterService';
import { of } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: ApexStroke | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  fill: ApexFill | any;
  legend: ApexLegend | any;
  grid: ApexGrid | any;
  markers: ApexMarkers | any;
};

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss']
})
export class InstructorDashboardComponent implements OnInit {
  // === Données PFE
  sujetsPfe: SujetPfe[] = [];
  isLoadingSujets = false;

  // === Formations
  trainings: any[] = [];
  filteredTrainings: any[] = [];
  isLoading = false;
  errorMessage = '';
  searchDataValue = '';
  selectedTraining: any = {};
  levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  types = ['ONLINE', 'Video'];

  // === Routes (icônes, navigation)
  public routes = routes;

  // === ApexCharts
  @ViewChild("chart") chart!: ChartComponent;
  public Areachart!: Partial<ChartOptions>;
  public ColumnCharts!: Partial<ChartOptions>;

  // === Best-selling courses
  public bestSellingCourses: bestSellingCourses[] = [];

  // === Statistiques des réclamations
  typeSeries: ApexNonAxisChartSeries = [];
  typeLabels: string[] = [];
  monthSeries: ApexAxisChartSeries = [];
  monthCategories: string[] = [];

  // === Statistiques Clustering
  clusterStats: { [key: string]: any[] } = {};
  clusterLabels: string[] = [];
  clusterCounts: number[] = [];
  clusterSeries: ApexNonAxisChartSeries = [];

  constructor(
    private DataService: DataService,
    private reclamationService: ReclamationService,
    private trainingService: TrainingService,
    private sujetPfeService: SujetPfeService,
    private clusteringService: ClusteringService
  ) {
    this.bestSellingCourses = this.DataService.bestSellingCourses;
  }

  ngOnInit(): void {
    this.loadReclamationStats();
    this.fetchTrainings();
    this.loadSujetsPfe();
    this.loadClusterStats();
    this.initCharts();
  }

  // === Chargement des sujets PFE
  loadSujetsPfe(): void {
    this.isLoadingSujets = true;
    this.sujetPfeService.getAllSujets().subscribe({
      next: (data) => {
        this.sujetsPfe = data;
        this.isLoadingSujets = false;
      },
      error: (error) => {
        console.error('Error loading sujets PFE:', error);
        this.isLoadingSujets = false;
      }
    });
  }

  // === Chargement des formations
  fetchTrainings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.trainingService.getAllTrainings().subscribe({
      next: (data) => {
        this.trainings = data;
        this.filteredTrainings = data;
        this.isLoading = false;
        this.updateDashboardStats(data);
      },
      error: (error) => {
        console.error('Error loading trainings:', error);
        this.errorMessage = 'Erreur lors du chargement des formations';
        this.isLoading = false;
      }
    });
  }

  private updateDashboardStats(trainings: any[]): void {
    const stats = {
      totalCourses: trainings.length,
      activeCourses: trainings.filter(t => t.status === 'active').length,
    };
    // Tu peux ajouter ici des mises à jour de KPI si nécessaire
  }

  // === Recherche filtrée
  searchData(): void {
    if (!this.searchDataValue.trim()) {
      this.filteredTrainings = this.trainings;
    } else {
      const search = this.searchDataValue.toLowerCase();
      this.filteredTrainings = this.trainings.filter(training =>
        training.title.toLowerCase().includes(search) ||
        training.level.toLowerCase().includes(search) ||
        training.typeTraning.toLowerCase().includes(search)
      );
    }
  }

  // === Classes couleurs par niveau
  getLevelClass(level: string): string {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-primary';
      case 'intermediate': return 'bg-info';
      case 'advanced': return 'bg-warning';
      case 'expert': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  toggleClass(index: number): void {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }

  // === Réclamations
  loadReclamationStats(): void {
    this.reclamationService.getByType().subscribe(data => {
      this.typeLabels = Object.keys(data);
      this.typeSeries = Object.values(data) as number[];
    });

    this.reclamationService.getByMonth().subscribe(data => {
      this.monthCategories = Object.keys(data);
      this.monthSeries = [{
        name: 'Réclamations',
        data: Object.values(data) as number[]
      }];
    });
  }

  // === Clustering étudiants
  loadClusterStats(): void {
    this.clusteringService.getClusterUsers().subscribe({
      next: (data) => {
        this.clusterStats = {};

        data.forEach(user => {

          if (user.cluster === -1) return;

         const clusterKey = `Cluster ${user.cluster} - ${user.label}`;
          if (!this.clusterStats[clusterKey]) {
            this.clusterStats[clusterKey] = [];
          }
          this.clusterStats[clusterKey].push(user);
        });

        this.clusterLabels = Object.keys(this.clusterStats);
        this.clusterCounts = this.clusterLabels.map(label => this.clusterStats[label].length);
        this.clusterSeries = [...this.clusterCounts];
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clusters:', error);
      }
    });
  }

  // === Initialisation des graphiques
  initCharts(): void {
    this.Areachart = {
      series: [
        {
          name: "Current month",
          data: [0, 10, 40, 43, 40, 25, 35, 25, 40, 30],
          color: "#FF9364"
        },
      ],
      chart: {
        height: 300,
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      markers: { size: 3 },
      dataLabels: { enabled: false },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
      grid: { show: false },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        categories: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        axisBorder: { show: true },
      },
    };

    this.ColumnCharts = {
      series: [
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
          color: "#1D9CFD"
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
          borderRadius: 7
        }
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
      },
      fill: { opacity: 1 },
      grid: { show: false },
    };
  }

  public isClassAdded: boolean[] = [false];
}
