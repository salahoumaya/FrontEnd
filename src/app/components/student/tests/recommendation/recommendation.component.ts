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

  // Définir des variables distinctes pour chaque graphique
  public satisfactionChartOptions: Partial<ChartOptions> | any;
  public sentimentChartOptions: Partial<ChartOptions> | any;
  public quizScoreChartOptions: Partial<ChartOptions> | any;

  recommendations: any[] = [];
  userEmail: string = '';
  score: number = 0;
  mediumFeedbacks: any[] = [];

  constructor(private userTestService: userTestService) {}

  ngOnInit(): void {}

  fetchRecommendations(): void {
    this.userTestService.getRecommendationFromLastScore().subscribe({
      next: (res) => {
        if (res.recommendations && Array.isArray(res.recommendations)) {
          this.recommendations = res.recommendations;
          this.userEmail = res.user || 'Utilisateur non trouvé';
          this.score = res.score || 0;

          // Filtrer les feedbacks moyens
          this.mediumFeedbacks = this.recommendations.filter((rec) => rec.UserSatisfaction >= 1.6 && rec.UserSatisfaction < 2.6);

          const trainingNames = this.recommendations.map((rec) => rec.trainingName);
          const satisfaction = this.recommendations.map((rec) => rec.UserSatisfaction);
          const sentiment = this.recommendations.map((rec) => rec.SentimentScore);
          const quizScores = this.recommendations.map((rec) => rec.QuizScores);

          this.satisfactionChartOptions = {
            series: [{ name: 'Satisfaction', data: satisfaction }],
            chart: {
              type: 'line',
              height: 400,
              toolbar: { show: false },
              animations: { enabled: true },
            },
            title: { text: 'Satisfaction par Formation', align: 'center' },
            xaxis: { categories: trainingNames },
            dataLabels: { enabled: true, style: { fontSize: '12px' } },
            yaxis: { min: 0, title: { text: 'Score de Satisfaction' } },
            colors: ['#3498db'],
            legend: { position: 'top' },
          };


          this.sentimentChartOptions = {
            series: sentiment,
            chart: { type: 'donut', height: 400 },
            title: { text: 'Répartition des Commentaires de FeddBacks par Formation', align: 'center' },
            labels: trainingNames,
            dataLabels: { enabled: true, style: { fontSize: '14px' } },
            colors: ['#e74c3c', '#f39c12', '#2ecc71'], 
            legend: { position: 'bottom' },
          };


          this.quizScoreChartOptions = {
            series: [{ name: 'Score Quiz', data: quizScores }],
            chart: { type: 'bar', height: 400 },
            title: { text: 'Score Moyennes par Formation', align: 'center' },
            xaxis: { categories: trainingNames },
            dataLabels: { enabled: true },
            yaxis: { min: 0, title: { text: 'Valeurs' } },
            colors: ['#32cd32'],
            legend: { position: 'top' },
          };
        } else {
          console.error('Aucune recommandation trouvée');
        }
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }


  getSatisfactionLabel(score: number): string {
    if (score < 1.6) return ' Faible';
    if (score < 2.6) return ' Moyenne';
    return ' Bonne';
  }

  getSentimentLabel(score: number): string {
    if (score < -0.4) return 'Très négatif';
    if (score < 0) return ' Négatif';
    if (score < 0.1) return ' Neutre';
    return ' Positif';
  }
}
