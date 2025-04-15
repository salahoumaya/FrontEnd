import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle, ApexAxisChartSeries, ApexXAxis, ApexPlotOptions } from 'ng-apexcharts';
import { ReclamationService } from 'src/app/shared/service/reclamation/adminreclamation.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

@Component({
  selector: 'app-reclamation-states',
  templateUrl: './reclamation-states.component.html',
  styleUrls: ['./reclamation-states.component.scss']
})
export class ReclamationStatesComponent implements OnInit {

  // Par Type
  typeSeries: ApexNonAxisChartSeries = [];
  typeLabels: string[] = [];

  // Par Statut
  statusSeries: ApexNonAxisChartSeries = [];
  statusLabels: string[] = [];

  // Par Mois
  monthSeries: ApexAxisChartSeries = [];
  monthCategories: string[] = [];

  pastelColors = ['#A3CEF1', '#FFC9DE', '#FFE4A7', '#C8E7A3', '#D5C6E0'];

  constructor(private statService: ReclamationService) {}

  ngOnInit(): void {
    this.statService.getByType().subscribe(data => {
      this.typeLabels = Object.keys(data);
      this.typeSeries = Object.values(data) as number[];
    });

    this.statService.getByStatus().subscribe(data => {
      this.statusLabels = Object.keys(data);
      this.statusSeries = Object.values(data) as number[];
    });

    this.statService.getByMonth().subscribe(data => {
      this.monthCategories = Object.keys(data);
      this.monthSeries = [{
        name: 'Réclamations',
        data: Object.values(data) as number[]
      }];
    });
  }

  // Options génériques (pour charts sans axes comme pie/donut)
  getPieOptions(labels: string[], title: string): any {
    return {
      chart: { type: 'pie' },
      labels,
      responsive: [{
        breakpoint: 480,
        options: { chart: { width: 300 }, legend: { position: 'bottom' } }
      }],
      title: { text: title, align: 'center' }
    };
  }

  getDonutOptions(labels: string[], title: string): any {
    return {
      chart: { type: 'donut' },
      labels,
      title: { text: title, align: 'center' }
    };
  }

  getBarOptions(categories: string[], title: string): any {
    return {
      chart: { type: 'bar' },
      xaxis: { categories },
      title: { text: title, align: 'center' },
      plotOptions: { bar: { borderRadius: 5, horizontal: false } }
    };
  }

  // ✅ Méthode corrigée
generatePdfReport() {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('📈 Rapport Statistique des Réclamations', 14, 15);

  // 📊 Par Type
  autoTable(doc, {
    startY: 25,
    head: [['Type', 'Nombre']],
    body: this.typeLabels.map((label, index) => [label, this.typeSeries[index].toString()]),
    theme: 'grid',
    headStyles: { fillColor: [163, 206, 241] },
  });

  // 📋 Par Statut
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Statut', 'Nombre']],
    body: this.statusLabels.map((label, index) => [label, this.statusSeries[index].toString()]),
    theme: 'grid',
    headStyles: { fillColor: [249, 213, 229] },
  });

  // 📅 Par Mois
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Mois', 'Nombre']],
    body: this.monthCategories.map((label, index) => [label, (this.monthSeries[0].data[index] as number).toString()]),
    theme: 'grid',
    headStyles: { fillColor: [212, 240, 223] },
  });

  doc.save('rapport-reclamations.pdf');
}
}
