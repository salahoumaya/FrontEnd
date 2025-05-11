import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/shared/service/LevelTest/test.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {
  public routes = routes;
  selectedImage: File | null = null;
  isEditMode: boolean = false;
  testId: number | null = null;
  selectedImageBase64: string | null = null;  // 🔹 Stocker l'image en base64 ici

  test = {
    title: '',
    description: '',
    scheduledAt: '',
    duration: 60,
    score: 100,
    image: ''
  };

  constructor(
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.testId = +id;
        this.isEditMode = true;
        this.loadTestDetails(this.testId);
      }
    });
  }

  loadTestDetails(testId: number) {
    this.testService.getTestById(testId).subscribe({
      next: (data) => {
        this.test = data;
        console.log("Données du test chargées :", data);
      },
      error: (err) => console.error("Erreur lors du chargement du test :", err)
    });
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // 🔴 Limiter la taille de l'image à 500 Ko
      if (file.size > 500 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 500 Ko.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
        // 🔹 Enlever le préfixe "data:image/png;base64," et stocker seulement les données base64
        this.test.image = this.selectedImageBase64.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }


  saveTest() {
    if (this.isEditMode && this.testId) {
      this.testService.updateTest(this.testId, this.test).subscribe(() => {
        alert("Test mis à jour avec succès !");
        this.router.navigate([this.routes.TestLevel]);
      });
    } else {
      this.testService.createTest(this.test).subscribe(() => {
        alert("Test créé avec succès !");
        this.router.navigate([this.routes.TestLevel]);
      });
    }
  }

  goToAddQuestion() {
    this.router.navigate([this.routes.AddQuestions]);
  }
}
