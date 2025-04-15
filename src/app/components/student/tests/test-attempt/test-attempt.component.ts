import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userTestService } from 'src/app/shared/service/LevelTest/userTest.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-test-attempt',
  templateUrl: './test-attempt.component.html',
  styleUrls: ['./test-attempt.component.scss']
})
export class TestAttemptComponent implements OnInit {
  test: any = null;
  answers: { [questionId: number]: string } = {};
  score: number | null = null;
  testId: number = 0;
  timeLeft: number = 0;
  timerInterval: any;
  hasSubmitted: boolean = false;
  public routes = routes;

  constructor(
    private route: ActivatedRoute,
    private testService: userTestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.testId) {
      alert("ID de test invalide !");
      this.router.navigate(['test-selection']);
      return;
    }

    this.loadTestDetails();
  }

  @HostListener('document:copy', ['$event'])
  @HostListener('document:paste', ['$event'])
  @HostListener('document:cut', ['$event'])
  handleCopyPaste(event: ClipboardEvent) {
    event.preventDefault();
    alert('🚫 Copier, couper et coller sont désactivés pendant le test.');
  }

  loadTestDetails() {
    this.testService.getTestById(this.testId).subscribe({
      next: (data) => {
        this.test = data;

        if (this.test?.duration) {
          this.timeLeft = this.test.duration * 60;
          this.startTimer();
        } else {
          console.error("Durée du test non définie !");
          alert("Erreur : Durée du test non définie !");
        }
      },
      error: (err) => {
        console.error("Erreur lors du chargement du test :", err);
        alert("Impossible de charger le test.");
        this.router.navigate(['test-selection']);
      }
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval);
        alert("⏳ Temps écoulé ! Votre test est soumis automatiquement.");
        this.autoSubmitTest();
      }
    }, 1000);
  }

  autoSubmitTest() {
    const submissionData = {
      testId: this.testId,
      answers: Object.entries(this.answers).map(([questionId, userAnswer]) => ({
        questionId: Number(questionId),
        userAnswer: userAnswer?.trim() || ""
      }))
    };

    this.testService.submitTest(submissionData).subscribe({
      next: (score) => {
        this.score = score;
        this.hasSubmitted = true;

        localStorage.setItem('testPassed', 'true');

        alert(`✅ Temps écoulé ! Votre test a été soumis automatiquement. Score : ${this.score} / ${this.test.score}`);
        this.goToResult(this.testId);
      },
      error: (err) => {
        console.error("Erreur lors de la soumission auto :", err);
        alert("Ce test a déjà été soumis, vous ne pouvez plus soumettre à nouveau !");
        this.goToResult(this.testId);
      }
    });
  }

  submitTest() {
    if (this.hasSubmitted) {
      alert("🚫 Ce test a déjà été soumis, vous ne pouvez plus soumettre à nouveau !");
      return;
    }

    const submissionData = {
      testId: this.testId,
      answers: Object.entries(this.answers).map(([questionId, userAnswer]) => ({
        questionId: Number(questionId),
        userAnswer: userAnswer?.trim() || ""
      }))
    };

    this.testService.submitTest(submissionData).subscribe({
      next: (score) => {
        this.score = score;
        this.hasSubmitted = true;

        localStorage.setItem('testPassed', 'true');

        alert(`Test soumis avec succès ! Votre score : ${this.score} / ${this.test.score}`);
        this.goToResult(this.testId);
      },
      error: (err) => {
        console.error("Erreur lors de la soumission du test :", err);
        alert(" 🚫 Ce test a déjà été soumis, vous ne pouvez plus soumettre à nouveau !");
        this.goToResult(this.testId);
      }
    });

    clearInterval(this.timerInterval);
  }

  // ✅ Nouvelle méthode
  goToResult(testId: number) {
    console.log("🔁 Redirection vers le résultat du test ID =", this.routes.test_result, testId);
    this.router.navigate([`${this.routes.test_result}/${testId}`]);
  }
  currentQuestionIndex: number = 0;

get currentQuestion() {
  return this.test?.questions[this.currentQuestionIndex];
}
goToNextQuestion() {
  if (this.currentQuestionIndex < this.test?.questions.length - 1) {
    this.currentQuestionIndex++;
  }
}
goToPreviousQuestion() {
  if (this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
  }
}

}
