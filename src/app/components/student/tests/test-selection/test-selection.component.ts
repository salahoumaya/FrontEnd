import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userTestService } from 'src/app/shared/service/LevelTest/userTest.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-test-selection',
  templateUrl: './test-selection.component.html',
  styleUrls: ['./test-selection.component.scss']
})
export class TestSelectionComponent implements OnInit {
  tests: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  public routes = routes;

  constructor(private testService: userTestService, private router: Router) {}

  ngOnInit() {
    this.loadTests();
  }

  loadTests() {
    this.testService.getTests().subscribe({
      next: (data) => {
        this.tests = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des tests :", err);
        this.errorMessage = "Impossible de charger les tests.";
        this.isLoading = false;
      }
    });
  }

  startTest(testId: number) {
    console.log("Navigation vers :", `${this.routes.test_attempt}/${testId}`);
    this.router.navigate([`${this.routes.test_attempt}/${testId}`]);
  }
}
