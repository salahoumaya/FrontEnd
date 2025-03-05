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
  selectedImageBase64: string | null = null;  // 🔹 Stocker l'image en base64

  // 🔹 Ajouter 'image' dans l'objet test pour stocker l'image en base64
  test = {
    title: '',
    description: '',
    scheduledAt: '',
    duration: 60,
    score: 100,
    image: ''  // 🔹 Nouvelle propriété pour l'image
  };

  constructor(private testService: TestService, private router: Router) {}

  createTest() {
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
      this.router.navigate([this.routes.TestLevel]);
    });
  }

  // 🔹 Fonction pour gérer l'image sélectionnée et la convertir en base64
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 2 Mo.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
        this.test.image = this.selectedImageBase64;  // 🔹 Mettre à jour l'image dans l'objet test
      };
      reader.readAsDataURL(file);
    }
  }

  goToAddQuestion() {
    this.router.navigate([this.routes.AddQuestions]);
  }
}
