import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from 'src/app/services/formation.service';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { userTestService } from 'src/app/shared/service/LevelTest/userTest.service';
import { routes } from 'src/app/shared/service/routes/routes';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-student-order-history',
  templateUrl: './student-order-history.component.html',
  styleUrl: './student-order-history.component.scss'
})
export class StudentOrderHistoryComponent implements OnInit {
   tests: any[] = [];
    isLoading: boolean = true;
    errorMessage: string = '';
    public routes:any = routes;

    constructor(private testService: userTestService,private auth: AuthService, private router: Router,private formationService: FormationService) {}
  id:any
  status:boolean=false
    ngOnInit() {
      this.auth.getProfile().subscribe(
        (user) => {
          console.log("User profile:", user.ourUsers.id);
          this.id = user.ourUsers.id
          console.log("User ID:", this.id);
          this.getFormations()
        },
        (error) => {
          console.error("Error fetching user profile:", error);
        }
      );


    }

    formations:any[]=[]
    getFormations(): void {
      this.formationService.getAllFormationsuser(this.id).subscribe((data) => {
        console.log(data);

        this.formations = data;
      });
    }
      downloadPlanningPDF(planning: any) {
        const doc = new jsPDF();


        doc.setFontSize(16);
        doc.text('Training Planning Overview', 14, 20);


        doc.setFontSize(12);
        doc.text(`Title: ${planning.title || 'N/A'}`, 14, 30);
        doc.text(`Planning Type: ${planning.planningType}`, 14, 37);
        doc.text(`Start Date: ${new Date(planning.startDate).toLocaleDateString()}`, 14, 44);
        doc.text(`End Date: ${new Date(planning.endDate).toLocaleDateString()}`, 14, 51);

        let currentY = 60;


        if (planning.planningDays && planning.planningDays.length > 0) {
          const rows = planning.planningDays.map((day: any) => [
            new Date(day.day).toLocaleDateString(),
            day.dayType,
            day.description || '',
            day.startTime,
            day.endTime

          ]);

          autoTable(doc, {
            startY: currentY,
            head: [['Date', 'Type','Description', 'Start Time', 'End Time']],
            body: rows,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [63, 81, 181] }
          });

          currentY = (doc as any).lastAutoTable.finalY + 10;
        } else {
          doc.setFontSize(12);
          doc.text('No planning days available.', 14, currentY);
        }

        // Save the PDF
        doc.save(`Planning_${planning.title || 'export'}.pdf`);
      }



  }
