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

  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit() {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTestSubmissions();
  }

  loadTestSubmissions() {
    this.testService.getTestSubmissions(this.testId).subscribe({
      next: (data) => {
        this.submissions = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des résultats :", err);
      }
    });
  }
}
