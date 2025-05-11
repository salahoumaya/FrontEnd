import { Component } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { DataService } from 'src/app/shared/service/data/data.service';
import { SidebarService } from 'src/app/shared/service/sidebar/sidebar.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { SidebarItem } from 'src/app/models/model';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
  base = '';
  page = '';
  last = '';
  public routes = routes;
  sidebar: SidebarItem[] = [];
  user: any = null;
  public showDark = false;
  constructor(
    private common: CommonService,
    private authService: AuthService,
    private data: DataService,
    private sidebarService: SidebarService
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.sidebar = this.data.sideBar;
    this.sidebarService.showDark.subscribe((res: string | boolean) => {
      if (res == 'true') {
        this.showDark = true;
      } else {
        this.showDark = false;
      }
    });
  }
  ngOnInit(): void {
    this.loadUser();


    this.sidebarService.showDark.subscribe((res: string | boolean) => {
      this.showDark = res === 'true';
    });
  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }
  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }
  loadUser() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.user = response.ourUsers;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  isDarkMode: boolean = false;
  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  public themeChange(): void {
    this.sidebarService.themeColor();
    this.applyTheme();
  }
}
