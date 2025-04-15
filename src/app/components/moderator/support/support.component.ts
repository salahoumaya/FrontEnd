import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { routes } from 'src/app/shared/service/routes/routes';
import { TrainingService } from 'src/app/shared/service/TrainingPlan/training.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PlanningDay {
  day: string;
  startTime: string;
  endTime: string;
  description: string;
  dayType: string;

}

interface PlanningPayload {
  title:string;
  startDate: string;
  endDate: string;
  planningType: string;
  training: { id: string };
  planningDays: PlanningDay[];
}

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  public routes = routes;
  public selected = '';
  public selectedTraining = '';
  public trainings: any[] = [];
  todayString: string = new Date().toISOString().split('T')[0];


  planning = {
    title:'',
    startDate: '',
    endDate: '',
    type: '',
    trainingId: '',
    days: [
      {
        date: '',
        fields: [
          {
            dayType: '',
            startTime: '',
            endTime: '',
            description: ''
          }
        ]
      }
    ]
  };

  constructor(
    private trainingService: TrainingService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchTrainings();
  }

  fetchTrainings() {
    this.trainingService.getTrainingsForAuthenticatedTrainer().subscribe(
      (data) => {
        this.trainings = data;
      },
      (error) => {
        console.error('Failed to load trainings. Please try again.');
      }
    );
  }

  addDay() {
    this.planning.days.push({
      date: '',
      fields: [
        {
          dayType: '',
          startTime: '',
          endTime: '',
          description: ''
        }
      ]
    });
  }

  removeDay(dayIndex: number) {
    this.planning.days.splice(dayIndex, 1);
  }

  addField(dayIndex: number) {
    this.planning.days[dayIndex].fields.push({
      dayType: '',
      startTime: '',
      endTime: '',
      description: ''
    });
  }

  removeField(dayIndex: number, fieldIndex: number) {
    this.planning.days[dayIndex].fields.splice(fieldIndex, 1);
  }

  submitPlanning() {
    const today = new Date();
    const selectedStartDate = new Date(this.planning.startDate);

    if (selectedStartDate < new Date(today.setHours(0, 0, 0, 0))) {
      alert("Start date must be today or in the future");
      return;
    }

    const formattedPlanning: PlanningPayload = {
      title: this.planning.title,
      startDate: this.planning.startDate,
      endDate: this.planning.endDate,
      planningType: this.planning.type,
      training: { id: this.planning.trainingId },
      planningDays: []
    };

    for (let day of this.planning.days) {
      if (new Date(day.date) < new Date(today.setHours(0, 0, 0, 0))) {
        alert("One of the planning day dates is in the past. Please correct it.");
        return;
      }

      for (let field of day.fields) {
        const planningDay: PlanningDay = {
          day: day.date,
          startTime: `${field.startTime}:00`,
          endTime: `${field.endTime}:00`,
          description: field.description,
          dayType: field.dayType
        };
        formattedPlanning.planningDays.push(planningDay);
      }
    }

    this.trainingService.addPlanning(formattedPlanning).subscribe(
      (data) => {
        alert("Planning created successfully!");
      },
      (error) => {
        console.log(error);
        alert("Error creating planning: " + (error?.error?.startDate || 'Please check your data.'));
      }
    );
  }
}
