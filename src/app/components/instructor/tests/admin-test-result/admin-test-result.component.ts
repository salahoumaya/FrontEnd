import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ApexStroke,
  ApexTooltip
} from 'ng-apexcharts';

@Component({
  selector: 'app-admin-test-results',
  templateUrl: './admin-test-result.component.html',
  styleUrls: ['./admin-test-result.component.scss']
})
export class AdminTestResultComponent implements OnInit {
  testId!: number;
  submissions: any[] = [];
  statistics: any = null;
  difficultQuestions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit() {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("ID du test récupéré :", this.testId);
    if (this.testId && this.testId > 0) {
      this.loadTestSubmissions();
      this.loadStatistics();
    } else {
      console.error("❌ ID du test invalide :", this.testId);
    }
  }

  loadTestSubmissions() {
    this.testService.getTestSubmissions(this.testId).subscribe({
      next: (data) => {
        console.log("📥 Résultats reçus :", data);
        this.submissions = data;
      },
      error: (err) => {
        console.error("❌ Erreur lors du chargement des résultats :", err);
      }
    });
  }



  loadStatistics() {
    this.testService.getTestStatistics(this.testId).subscribe({
      next: (data) => {
        console.log("📊 Statistiques reçues :", data);
        this.statistics = data;
        this.difficultQuestions = data.difficultQuestions;
      },
      error: (err) => {
        console.error("❌ Erreur lors du chargement des statistiques :", err);
      }
    });
  }
}
