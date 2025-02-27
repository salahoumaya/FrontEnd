import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/shared/service/LevelTest/Question.service';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  question = {
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  };

  public routes = routes;
  tests: any[] = [];
  selectedTestId: number | null = null;

  constructor(
    private questionService: QuestionService,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTests();
  }

  loadTests() {
    this.testService.getTests().subscribe({
      next: (data) => {
        this.tests = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des tests :", err);
      }
    });
  }

  createQuestion() {
    if (!this.selectedTestId) {
      alert("Veuillez sélectionner un test.");
      return;
    }

    // Validation : au moins 3 options doivent être remplies
    const filledOptions = [this.question.optionA, this.question.optionB, this.question.optionC, this.question.optionD]
      .filter(option => option.trim() !== '');

    if (filledOptions.length < 3) {
      alert("Une question doit avoir au moins trois options.");
      return;
    }

    // Validation : la réponse correcte doit être l'une des options fournies
    if (!filledOptions.includes(this.question.correctAnswer)) {
      alert("La réponse correcte doit être l'une des options fournies.");
      return;
    }

    const testId = Number(this.selectedTestId);
    if (isNaN(testId)) {
      alert("L'ID du test sélectionné est invalide.");
      return;
    }

    this.questionService.createQuestion(testId, this.question).subscribe({
      next: () => {
        alert("Question ajoutée avec succès !");
        this.router.navigate([this.routes.Questions]);
      },
      error: (err) => console.error("Erreur lors de l'ajout :", err)
    });
  }
}
