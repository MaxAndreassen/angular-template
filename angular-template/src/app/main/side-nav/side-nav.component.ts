import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import {
  faTachometerAlt,
  faEdit,
  faStore,
  faAlignJustify,
  faAllergies,
  faBook,
  faUtensils,
  faList,
  faRoad,
  faAngleRight,
  faAngleLeft,
  faShare,
  faCloud,
  faRobot,
  faTag,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../shared/models/auth.models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sidebarEnabled = true;
  toggleIconOn = faAngleRight;
  toggleIconOff = faAngleLeft;

  navItems: DashboardSideNavItem[] = [
    {
      url: 'profile/edit',
      title: 'Profile',
      icon: faUser,
      isPaid: false
    },
  ];

  securityContext: SecurityContext;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
        return;
    }

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
        this.securityContext = context;
    });
  }

  toggleSidebar(): any {
    this.sidebarEnabled = !this.sidebarEnabled;
    this.authService.sidebarEmitter.emit(this.sidebarEnabled);
  }
}

interface DashboardSideNavItem {
  url: string;
  title: string;
  icon: any;
  isPaid: boolean;
}
