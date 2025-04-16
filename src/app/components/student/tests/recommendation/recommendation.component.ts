import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexYAxis, ChartComponent, ApexLegend } from 'ng-apexcharts';
import { userTestService } from '../../../../shared/service/LevelTest/userTest.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  legend: ApexLegend;
};

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  recommendations: any[] = [];
  userEmail: string = '';
  score: number = 0;

  constructor(private userTestService: userTestService) {}

  ngOnInit(): void {}
  fetchRecommendations(): void {
    this.userTestService.getRecommendationFromLastScore().subscribe({
      next: (res) => {
        console.log('Réponse reçue :', res);

        // Mise à jour de la condition pour vérifier directement la réponse
        if (res.recommendations && Array.isArray(res.recommendations)) {
          this.recommendations = res.recommendations;
          this.userEmail = res.user || 'Utilisateur non trouvé';  // Utilisation de l'email
          this.score = res.score || 0;  // Utilisation du score

          const trainingNames = this.recommendations.map((rec) => rec.trainingName);
          const satisfaction = this.recommendations.map((rec) => rec.UserSatisfaction);
          const sentiment = this.recommendations.map((rec) => rec.SentimentScore);
          const quizScores = this.recommendations.map((rec) => rec.QuizScores);
          const compositeScores = this.recommendations.map((rec) => rec.CompositeScore);

          this.chartOptions = {
            series: [
              { name: 'Satisfaction', data: satisfaction },
              { name: 'Sentiment', data: sentiment },
              { name: 'Score Quiz', data: quizScores },
              { name: 'Score Composite', data: compositeScores },
            ],
            chart: { type: 'bar', height: 400 },
            title: { text: 'Statistiques des formations recommandées' },
            xaxis: { categories: trainingNames },
            dataLabels: { enabled: true },
            yaxis: { min: 0, title: { text: 'Valeurs' } },
            legend: { position: 'top' },
          };
        } else {
          console.error('Aucune recommandation trouvée dans la réponse');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des recommandations :', err);
      },
    });
  }




  // Méthodes pour étiqueter les scores
  getSatisfactionLabel(score: number): string {
    if (score < 1.6) return '❌ Faible';
    if (score < 3.6) return '😐 Moyenne';
    return '✅ Bonne';
  }

  getSentimentLabel(score: number): string {
    if (score < -0.4) return '🔴 Très négatif';
    if (score < 0) return '😠 Négatif';
    if (score < 0.2) return '😐 Neutre';
    return '😀 Positif';
  }

  getQuizScoreLabel(score: number): string {
    if (score < 51) return '❌ Faible';
    if (score < 76) return '🙂 Moyen';
    return '🏆 Excellent';
  }

  getCompositeScoreLabel(score: number): string {
    if (score < 1.6) return '🔴 À revoir';
    if (score < 2.6) return '🟡 Acceptable';
    return '🟢 Recommandé';
  }
}
