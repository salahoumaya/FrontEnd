import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { DataService } from 'src/app/shared/service/data/data.service';
import { SidebarService } from 'src/app/shared/service/sidebar/sidebar.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { SidebarItem } from 'src/app/models/model';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { ReclamationService } from 'src/app/shared/service/reclamation/reclamation.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.scss'],
})
export class StudentHeaderComponent implements OnInit {
  base = '';
  page = '';
  last = '';
  public routes = routes;

  sidebar: SidebarItem[] = [];
  isDarkMode: boolean = false;
  public showDark = false;

  user: any = null;
  notifications: any[] = [];
  unreadCount: number = 0;

  constructor(
    private common: CommonService,
    private data: DataService,
    private sidebarService: SidebarService,
    private authService: AuthService,
    private reclamationService: ReclamationService
  ) {
    this.common.base.subscribe((res: string) => this.base = res);
    this.common.page.subscribe((res: string) => this.page = res);
    this.common.last.subscribe((res: string) => this.last = res);
    this.sidebar = this.data.sideBar;
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadNotifications();

    this.sidebarService.showDark.subscribe((res: string | boolean) => {
      this.showDark = res === 'true';
    });
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
  loadNotifications() {
    this.reclamationService.getMyReclamations().subscribe(recs => {
      // Ne garde que les réclamations non "OPEN" et non lues
      this.notifications = recs.filter(r => r.status !== 'OPEN' && !r.read);
      this.updateUnreadCount();
    });
  }
  markAsRead(notif: any) {
    if (notif.read) return;

    this.reclamationService.markAsRead(notif.id).subscribe({
      next: () => {
        // Supprime la notif de la liste (car elle est lue)
        this.notifications = this.notifications.filter(n => n.id !== notif.id);
        this.updateUnreadCount();
      },
      error: () => alert("Erreur lors du marquage comme lu")
    });
  }

  markAllAsRead() {
    const unread = [...this.notifications]; // copie pour itérer
    unread.forEach(n => {
      this.reclamationService.markAsRead(n.id).subscribe({
        next: () => {
          // Supprime chaque notif une à une
          this.notifications = this.notifications.filter(not => not.id !== n.id);
          this.updateUnreadCount();
        },
        error: () => console.error("Erreur lors du marquage")
      });
    });
  }

  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }



  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }

  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }

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
