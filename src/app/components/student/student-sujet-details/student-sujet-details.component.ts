import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import {
  instructorProfile,
  instructorProfileEducation,
  instructorProfileExperience,
  instructorProfileCourses,
  instructorProfileReviews,
  instructorProfileOverview,
  instructorProfileContactDetails
} from 'src/app/models/model';
import {DemandeStatus, SujetPfe} from 'src/app/models/sujetpfe';
import {OurUsers} from 'src/app/models/users';
import {DataService} from 'src/app/shared/service/data/data.service';
import {routes} from 'src/app/shared/service/routes/routes';
import {SujetPfeService} from 'src/app/shared/service/sujetPfe/sujetpfe.service';
import {ToastrService} from 'ngx-toastr';

interface data {
  active?: boolean;
}

@Component({
   selector: 'app-student-sujet-details',

  templateUrl: './student-sujet-details.component.html',
  styleUrl: './student-sujet-details.component.scss'
})
export class StudentSujetDetails implements OnInit {
  sujetPfe!: SujetPfe;
  studentName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sujetPfeService: SujetPfeService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    const sujetId = this.route.snapshot.paramMap.get('id');
    if (sujetId) {
      this.sujetPfeService.getSujetById(+sujetId).subscribe((sujet) => {
        this.sujetPfe = sujet;

        this.sujetPfeService.getStudentAffectedToPfe(Number(sujetId)).subscribe((student) => {
          this.studentName = student.name;
        });
      });
    }
  }


}
