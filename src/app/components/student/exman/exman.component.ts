import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Examen, ExamenService } from 'src/app/services/examen.service';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';

@Component({
  selector: 'app-exman',
  templateUrl: './exman.component.html',
  styleUrl: './exman.component.scss'
})
export class ExmanComponent  implements OnInit {
  examens: Examen[] = [];
  examenForm!: FormGroup;
  isEditing: boolean = false;
  selectedExamenId?: number;
  idformation!: number;
  

  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService,
    private auth:AuthService,
    private fb: FormBuilder
  ) {}
  userId:any
  ngOnInit(): void {
    this.idformation = Number(this.route.snapshot.paramMap.get('id'));
    this.auth.getProfile().subscribe(
      (user) => {
        console.log("User profile:", user.ourUsers.id);
        this.userId = user.ourUsers.id
        console.log("User ID:", this.userId);
        this.loadExamens();
      },
      (error) => {
        console.error("Error fetching user profile:", error);
      }
    );
    this.initForm();
    
  }
  selectedExamToDo: any = null;
  examenId:any
userAnswers: { [questionId: number]: number } = {};
  assignUser(examenId: number) {
    
    this.examenService.getExamFull(examenId).subscribe(res => {
      this.selectedExamToDo = res;
      this.userAnswers = {}; 
    
    }, error => {
      alert("Erreur lors de l'affectation !");
    });
  }
  submitExam() {
    console.log("Réponses utilisateur :", this.userAnswers);
    const payload = Object.entries(this.userAnswers).map(([questionId, answerId]) => ({
      questionId: Number(questionId),
      selectedAnswerId: Number(answerId) 
    }));
  
    const finalDto = {
      examId: this.selectedExamToDo.id,
      answers: payload
    };
  
    this.examenService.submitUserAnswers(finalDto,this.userId, this.selectedExamToDo.id).subscribe(res => {
      alert(res); 
      this.selectedExamToDo = null;
    });
  }
  
  
  initForm(): void {
    this.examenForm = this.fb.group({
      titre: ['', Validators.required],
      note: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      examenT: ['ORAL', Validators.required],
      session: ['PRINCIPALE', Validators.required],
      date: ['', Validators.required]
    });
  }
  goBack(){
    window.history.back()
  }
  loadExamens(): void {
    this.examenService.getExamensbyfor(this.idformation).subscribe((data) => {
      console.log(data);
      
      this.examens = data;
    });
  }

  addExamen(): void {
    if (this.examenForm.valid) {
      const formattedDate = new Date(this.examenForm.value.date).toISOString();

      this.examenForm.patchValue({
        date: formattedDate 
      });
      this.examenService.addExamen(this.examenForm.value,  this.idformation).subscribe(() => {
        this.loadExamens();
        this.examenForm.reset();
      },(error)=>{
        console.log(error);
        
      });
    }
  }

  editExamen(examen: Examen): void {
    this.isEditing = true;
    this.selectedExamenId = examen.id;
    this.examenForm.patchValue(examen);
  }

  updateExamen(): void {
    if (this.examenForm.valid && this.selectedExamenId) {
      const formattedDate = new Date(this.examenForm.value.date).toISOString();

      this.examenForm.patchValue({
        date: formattedDate 
      });
      this.examenService.updateExamen(this.selectedExamenId, this.examenForm.value).subscribe(() => {
        this.isEditing = false;
        this.selectedExamenId = undefined;
        this.loadExamens();
        this.examenForm.reset();
      });
    }
  }

  deleteExamen(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet examen ?')) {
      this.examenService.deleteExamen(id).subscribe(() => {
        this.loadExamens();
      });
    }
  }
}
