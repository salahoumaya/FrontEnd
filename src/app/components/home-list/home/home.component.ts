import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/shared/service/data/data.service';
import * as AOS from 'aos';
import { routes } from 'src/app/shared/service/routes/routes';
import {
  topCategories,
  trendingCourses,
  featuredInstructor,
  latestBlogs,
  featuredCourses,
  career,
  universitiesCompanies,
  testimonial,
} from 'src/app/models/model';
interface data {
  active?: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public routes = routes;
  public topCategories: topCategories[] = [];

  public latestBlogs: latestBlogs[] = [];
  public featuredCourses: featuredCourses[] = [];
  public career: career[] = [];

  public testimonial: testimonial[] = [];
  selected = '1';
  public universitiesCompanies = [
    { img: 'assets/img/universite-tunis.png', name: 'Université de Tunis' },
    { img: 'assets/img/ecole-ingenieurs.png', name: 'École d’Ingénieurs Centrale' },
    { img: 'assets/img/googlepng.png', name: 'Google' },
    { img: 'assets/img/microsoft.png', name: 'Microsoft' },
    { img: 'assets/img/ibm.png', name: 'IBM' },
    { img: 'assets/img/unesco.png', name: 'UNESCO' },
    // … ajoutez autant de partenaires que souhaité …
  ];
  public topCategoriesOwlOptions: OwlOptions = {
    margin: 24,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 4,
      },
      1170: {
        items: 3,
      },
    },
  };
  public trendingCoursesOwlOptions: OwlOptions = {
    margin: 24,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
  };
  public featuredInstructorOwlOptions: OwlOptions = {
    margin: 24,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 4,
      },
      1170: {
        items: 4,
      },
    },
  };
  public latestBlogsOwlOptions: OwlOptions = {
    margin: 24,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 4,
      },
      1170: {
        items: 4,
      },
    },
  };
  public universitiesCompaniesOwlOptions: OwlOptions = {
    margin: 24,
    nav: true,
    loop: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 6,
      },
      1170: {
        items: 6,
      },
    },
  };
  public slideConfig = {
    lazyLoad: 'ondemand',
    infinite: true,
  };

  constructor(private DataService: DataService, public router: Router) {
    this.topCategories = this.DataService.topCategories;
    this.latestBlogs = this.DataService.latestBlogs;

    this.career = this.DataService.career;

    this.testimonial = this.DataService.testimonial;
  }

  ngOnInit() {
    AOS.init({ duration: 1200, once: true });
  }
  toggleClass(slide: data) {
    slide.active = !slide.active;
  }
  public features = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Propositions de PFE',
      description:
        'Choisissez votre sujet de Projet de Fin d’Études et suivez son avancement pas à pas.',
      delay: 0,
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Recrutement de Formateurs',
      description:
        'Inscrivez-vous comme formateur ou découvrez nos experts IT pour vos apprentissages.',
      delay: 100,
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Recommandations Personnalisées',
      description:
        'Obtenez des parcours de formation adaptés à votre niveau grâce à notre test de placement.',
      delay: 200,
    },
    {
      icon: 'fas fa-star',
      title: 'Évaluation Finale',
      description:
        'Passez un test de validation à la fin de chaque module pour certifier vos compétences.',
      delay: 300,
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Événements & Hackathons',
      description:
        'Participez à nos ateliers, conférences et concours pour booster votre réseau.',
      delay: 400,
    },
    {
      icon: 'fas fa-comments',
      title: 'Espace de Discussion',
      description:
        'Communiquez avec les étudiants et formateurs via nos forums et salons de chat.',
      delay: 500,
    },
  ];

  public benefits = [
    {
      icon: 'fas fa-project-diagram',
      title: 'Suivi de PFE guidé',
      desc: 'Bénéficiez d’un accompagnement pas à pas sur votre Projet de Fin d’Études.',
      delay: 0,
       color: '#ff6b6b'
    },
    {
      icon: 'fas fa-user-tie',
      title: 'Formateurs experts',
      desc: 'Accédez à un réseau de professionnels IT pour vos apprentissages.',
      delay: 100,
       color: '#ff6b6b'
    },
    {
      icon: 'fas fa-magic',
      title: 'Recommandations dynamiques',
      desc: 'Parcours de formation personnalisés selon votre niveau et vos objectifs.',
      delay: 200,
       color: '#ff6b6b'
    },
    {
      icon: 'fas fa-clipboard-check',
      title: 'Évaluations certifiantes',
      desc: 'Validez vos compétences avec des tests et obtenez vos certifications.',
      delay: 300,
       color: '#ff6b6b'
    }
  ];

  public trendingCourses: trendingCourses[] = [
    {
      img1: 'assets/img/pfe-course.png',
      newPrice: 'GRATUIT',
      oldPrice: '',
      img2: 'assets/img/icons/pfe-icon.png',
      name: 'Coding Factory',
      role: 'Plateforme IT',
      active: false,
      subject: 'Projets de Fin d’Études',
      img3: 'assets/img/icons/lesson-icon.png',
      lesson: '12 modules',
      img4: 'assets/img/icons/time-icon.png',
      time: '6 semaines'
    },
    {
      img1: 'assets/img/recommandation-course.png',
      newPrice: 'INCLUS',
      oldPrice: '',
      img2: 'assets/img/icons/reco-icon.png',
      name: 'Recommandation AI',
      role: 'Personnalisée',
      active: false,
      subject: 'Parcours sur mesure',
      img3: 'assets/img/icons/lesson-icon.png',
      lesson: 'Test+4 modules',
      img4: 'assets/img/icons/time-icon.png',
      time: '4 semaines'
    },

  ];
  public featuredInstructor: featuredInstructor[] = [
    {
      img: 'assets/img/instructors/alice.png',
      name: 'Alice Durand',
      domain: 'Développement Web',
      students: 1200
    },
    {
      img: 'assets/img/instructors/bob.png',
      name: 'Bob Martin',
      domain: 'Data Science',
      students: 950
    },
    {
      img: 'assets/img/instructors/carol.png',
      name: 'Carol Ndiaye',
      domain: 'Cybersécurité',
      students: 800
    },
    // … etc. …
  ];

  public testimonials = [
    {
      img: 'assets/img/testimonial/amine.png',
      name: 'Amine Ben Salah',
      role: 'Étudiant Dév Web',
      feedback:
        "Grâce à Coding Factory, j'ai décroché un stage en tant que développeur front-end en 2 mois !",
    },
    {
      img: 'assets/img/testimonial/sara.png',
      name: 'Sara Trabelsi',
      role: 'Étudiante Data Science',
      feedback:
        "Le test de niveau et les recommandations personnalisées m'ont énormément aidée à progresser.",
    },
    {
      img: 'assets/img/testimonial/karim.png',
      name: 'Karim Moussa',
      role: 'Étudiant Cybersécurité',
      feedback:
        "La plateforme est très intuitive, et les formateurs sont vraiment experts dans leur domaine.",
    },
  ];

  public testimonialOptions: OwlOptions = {
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1170: { items: 3 },
    },
  };






  directPath() {
    this.router.navigate(['/pages/course/course-list']);
  }
}
