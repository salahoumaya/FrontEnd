import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  tests: any[] = [];
  filteredTests: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  public routes = routes;

  searchTitle: string = '';
  page: number = 1;
  pageSize: number = 6;
  selectedTest: any = null; // ✅ Test sélectionné
  questionId: number = 0; // ✅ Stocke l'ID de la question à ajouter

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit() {
    this.loadTests();
  }

  loadTests() {
    this.testService.getTests().subscribe({
      next: (data) => {
        this.tests = data;
        this.filteredTests = data;
        console.log("Tests récupérés :", data); // Pour vérifier les images dans la console
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des tests :", err);
        this.errorMessage = "Impossible de charger la liste des tests.";
        this.isLoading = false;
      }
    });
  }
  editTest(test: any) {
    const updatedTest = { ...test }; // Copier le test sélectionné pour l'éditer
    const newTitle = prompt("Modifier le titre du test:", test.title);
    if (newTitle) {
      updatedTest.title = newTitle;
      this.testService.updateTest(test.id, updatedTest).subscribe({
        next: () => {
          alert("Test mis à jour avec succès !");
          this.loadTests(); // Recharger les tests après la mise à jour
        },
        error: (err) => console.error("Erreur lors de la mise à jour du test :", err)
      });
    }
  }



  filterTests() {
    this.filteredTests = this.tests.filter(test =>
      test.title.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
    this.page = 1;
  }

  onPageChange(newPage: number) {
    console.log("Nouvelle page :", newPage);
    this.page = newPage;
  }

  goToAddTest() {
    this.router.navigate([this.routes.AddLevel]);
  }

  // ✅ Supprimer un test
  deleteTest(testId: number) {
    if (confirm("Voulez-vous vraiment supprimer ce test ?")) {
      this.testService.deleteTest(testId).subscribe({
        next: () => {
          this.tests = this.tests.filter(test => test.id !== testId);
          this.filteredTests = this.filteredTests.filter(test => test.id !== testId);
        },
        error: err => console.error("Erreur lors de la suppression du test :", err)
      });
    }
  }

  // ✅ Récupérer un test par ID
  getTestById(testId: number) {
    this.testService.getTestById(testId).subscribe({
      next: (test) => {
        this.selectedTest = test;
        console.log("Détails du test :", test);
      },
      error: err => console.error("Erreur lors de la récupération du test :", err)
    });
  }

  // ✅ Ajouter une question au test
  addQuestionToTest(testId: number, questionId: number) {
    if (!questionId) {
      alert("Veuillez entrer un ID de question valide.");
      return;
    }
    this.testService.addQuestionToTest(testId, questionId).subscribe({
      next: () => {
        alert(`Question ${questionId} ajoutée au test ${testId} !`);
        this.questionId = 0; // Réinitialisation du champ
      },
      error: err => console.error("Erreur lors de l'ajout de la question au test :", err)
    });
  }
  viewTestResults(testId: number) {
    this.router.navigate([`${this.routes.ResultTest}${testId}/submissions`]);
}
goToEditTest(testId: number) {
  this.router.navigate([`${this.routes.EditTest}/${testId}`]);
}





}
