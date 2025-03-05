import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';

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
chartData: any[] = [];
circleChartData: any[] = [];
averageScore: number = 0;

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
        this.averageScore = data.averageScore || 0;
        this.prepareChartData();
      },
      error: (err) => {
        console.error("❌ Erreur lors du chargement des statistiques :", err);
      }
    });
  }

  prepareChartData() {
    // ✅ Données pour les graphiques en barres
    this.chartData = [
      { name: 'Score moyen', value: this.averageScore },
      { name: 'Taux de réussite', value: this.statistics.passRate || 0 }
    ];

    // ✅ Données pour les graphiques circulaires
    this.circleChartData = this.difficultQuestions.map((question) => ({
      questionText: question.questionText,
      correctRate: question.correctRate
    }));
  }
}
