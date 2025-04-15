import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userTestService } from 'src/app/shared/service/LevelTest/userTest.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  score: number = 0;
  timeSpent: number = 0;
  testTitle: string = '';
  questionResults: any[] = [];
  errorMessage: string = '';
  selectedQuestionIndex: number | null = 0;

  loadingExplanation: { [key: number]: boolean } = {};
  explanations: { [key: number]: string } = {};

  public routes = routes;

  constructor(
    private route: ActivatedRoute,
    private testService: userTestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const testId = Number(this.route.snapshot.paramMap.get('id'));
    if (!testId || isNaN(testId)) {
      this.errorMessage = "❌ ID du test invalide.";
      return;
    }

    this.testService.getTestResult(testId).subscribe({
      next: (result) => {
        this.score = result.score;
        this.timeSpent = result.timeSpentSeconds;
        this.testTitle = result.testTitle;
        this.questionResults = result.questionResults || [];
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des résultats :", err);
        this.errorMessage = "❌ Impossible de charger les résultats du test.";
      }
    });
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  explain(question: any) {
    const id = question.questionId;
    this.loadingExplanation[id] = true;

    this.testService.explainAnswer(
      question.questionText,
      question.userAnswer,
      question.correctAnswer
    ).subscribe({
      next: (res) => {
        console.log("✅ Explication reçue :", res);
        this.explanations[id] = res.explanation;
        this.loadingExplanation[id] = false;
      },
      error: (err) => {
        console.error("❌ Erreur FastAPI (détail brut) :", err);
        if (err.error?.detail) {
          console.error("📛 Message d’erreur FastAPI :", err.error.detail);
        } else if (err.message) {
          console.error("📛 Message Angular :", err.message);
        } else {
          console.error("❗ Erreur inconnue :", err);
        }

        this.explanations[id] = "❌ Une erreur est survenue lors de l’explication.";
        this.loadingExplanation[id] = false;
      }
    });
  }


  getExplanationForCurrentQuestion(): string | null {
    const current = this.questionResults[this.selectedQuestionIndex || 0];
    if (!current) return null;
    return this.explanations[current.questionId] || null;
  }
}
