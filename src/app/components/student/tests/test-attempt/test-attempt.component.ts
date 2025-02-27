import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { userTestService } from 'src/app/shared/service/LevelTest/userTest.service';

@Component({
  selector: 'app-test-attempt',
  templateUrl: './test-attempt.component.html',
  styleUrls: ['./test-attempt.component.scss']
})
export class TestAttemptComponent implements OnInit {
  test: any = null; // Contient les détails du test sélectionné
  answers: { [questionId: number]: string } = {}; // Stocke les réponses utilisateur
  score: number | null = null;
  testId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private testService:userTestService ,
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

  loadTestDetails() {
    this.testService.getTestById(this.testId).subscribe({
      next: (data) => {
        this.test = data;
        console.log("Détails du test chargé :", this.test);
      },
      error: (err) => {
        console.error("Erreur lors du chargement du test :", err);
        alert("Impossible de charger le test.");
        this.router.navigate(['test-selection']);
      }
    });
  }

  submitTest() {
    const submissionData = {
      testId: this.testId,
      answers: this.answers
    };

    this.testService.submitTest(submissionData).subscribe({
      next: (score) => {
        this.score = score;
        alert(`Test soumis avec succès ! Votre score : ${this.score} / ${this.test.score}`);
      },
      error: (err) => {
        console.error("Erreur lors de la soumission du test :", err);
        alert("Erreur lors de la soumission du test.");
      }
    });
  }
}
