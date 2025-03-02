import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent {
  public routes = routes;

  test = {
    title: '',
    description: '',
    scheduledAt: '',
    duration: 60,  // Default 60 minutes
    score: 100     // Default 100 points
  };

  constructor(private testService: TestService, private router: Router) {}

  createTest() {
    // Validation des valeurs minimales/maximales
    if (this.test.duration < 1 || this.test.duration > 180) {
      alert("La durée du test doit être entre 1 et 180 minutes.");
      return;
    }
    if (this.test.score < 10 || this.test.score > 100) {
      alert("Le score total doit être entre 10 et 100.");
      return;
    }

    this.testService.createTest(this.test).subscribe(() => {
      alert("Test créé avec succès !");
      this.router.navigate([this.routes.TestLevel]); // Redirection vers la liste des tests
    });
  }

  goToAddQuestion() {
    this.router.navigate([this.routes.AddQuestions]);
  }
}
