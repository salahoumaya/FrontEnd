import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-moderator-sidebar',

  templateUrl: './moderator-sidebar.component.html',
  styleUrl: './moderator-sidebar.component.scss'
})
export class ModeratorSidebarComponent implements OnInit{

  public routes = routes;
  public moderatorProfile = {
    name: 'Modérateur Ahmed',
    image: 'assets/img/user/user1.jpg',
    role: 'MODERATOR'
  };

  constructor() {}

  ngOnInit(): void {}
}
