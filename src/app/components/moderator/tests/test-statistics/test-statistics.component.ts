import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';

@Component({
  selector: 'app-test-statistics',
  templateUrl: './test-statistics.component.html',
  styleUrl: './test-statistics.component.scss'
})
export class TestStatisticsComponent {
  testId!: number;
  statistics: any;

  constructor(private route: ActivatedRoute, private testService: TestService) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.loadStatistics();
  }

  loadStatistics() {
    this.testService.getTestStatistics(this.testId).subscribe({
      next: (data) => {
        this.statistics = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques:', err);
      }
    });
  }
}


