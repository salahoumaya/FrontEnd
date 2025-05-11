import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { routes } from 'src/app/shared/service/routes/routes';
import { QuestionService } from 'src/app/shared/service/LevelTest/Question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: any[] = [];
  filteredQuestions: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  public routes = routes;

  searchText: string = '';
  page: number = 1;
  pageSize: number = 5;

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe({
      next: (data) => {
        this.questions = data;
        this.filteredQuestions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des questions :", err);
        this.errorMessage = "Impossible de charger la liste des questions.";
        this.isLoading = false;
      }
    });
  }

  filterQuestions() {
    this.filteredQuestions = this.questions.filter(q =>
      q.questionText.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.page = 1;
  }

  goToAddQuestion() {
    this.router.navigate([this.routes.AddQuestions]);
  }

  onPageChange(newPage: number) {
    console.log("New page:", newPage);
    this.page = newPage;
  }
}
