import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import { FormationService } from 'src/app/services/formation.service';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { userTestService } from 'src/app/shared/service/LevelTest/userTest.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent implements OnInit {
  tests: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  public routes:any = routes;

  constructor(private testService: userTestService,private examenservice:ExamenService,private auth: AuthService, private router: Router,private formationService: FormationService) {}
id:any
status:boolean=false
  ngOnInit() {
    this.auth.getProfile().subscribe(
      (user) => {
        console.log("User profile:", user.ourUsers.id);
        this.id = user.ourUsers.id
        console.log("User ID:", this.id);
        this.getFormations()
        this.getExamens()
        this.getallFormations()
        this.loadTests()
        
      },
      (error) => {
        console.error("Error fetching user profile:", error);
      }
    );
  
   
  }
  hidden:boolean = false;
  toggleHidden() {
    this.hidden = !this.hidden;
  }
  formations:any[]=[]
  formationsall:any[]=[]
  examans:any[]=[]
  getExamens(): void {
    this.examenservice.getAllexsuser(this.id).subscribe((data) => {
      this.examans = data;
      console.log(data);
      
    });
  }
  
  getFormations(): void {
    this.formationService.getAllFormationsuser(this.id).subscribe((data) => {
      console.log(data);
      
      this.formations = data;
    });
  }
  courses:any[]=[]
  hiddenfor:boolean=false
  showCourses: boolean = false;
selectedFormationId: number | null = null;


cancelCoursesView() {
  this.showCourses = false;
  this.selectedFormationId = null;
}

  getCourses(id:any): void {
    this.selectedFormationId = id;
    this.showCourses = true;
    this.formationService.getAllCouresebyformation(id).subscribe((data) => {
      console.log(data);
      
      this.courses = data;
    });
  }
  moyenne:any
  formationMoyennes: { [key: number]: number } = {}; 
  getallFormations(): void {
    this.formationService.getAllFormations().subscribe((data) => {
      this.formationsall = data;
  
      this.formations.forEach((formation: any) => {
        this.examenservice.getmoyenne(this.id, formation.id).subscribe((moyenne: number) => {
          this.formationMoyennes[formation.id] = moyenne;
        }, error => {
          console.error(`Erreur en récupérant la moyenne pour formation ${formation.id}`, error);
          this.formationMoyennes[formation.id] = 0;
        });
      });
  
    }, error => {
      console.error('Erreur lors de la récupération des formations', error);
    });
  }
  
  getmoyenne(idf:number):void{
    this.examenservice.getmoyenne(this.id,idf).subscribe((data:any[]) => {
      console.log(data);
      this.moyenne=data
     
    }, (error) => {
      console.error('Error fetching formations', error);
    }
    );
  }


  assignUser(formationId: number) {
    this.formationService.assignUserToFormation(formationId, this.id).subscribe(response => {
      alert(response);
    }, error => {
      alert("Erreur lors de l'affectation !");
    });
  }
  selected(){
    this.status=  !this.status
    if (this.status) {
      this.getallFormations()
    }else{
      this.getFormations()
    }

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
