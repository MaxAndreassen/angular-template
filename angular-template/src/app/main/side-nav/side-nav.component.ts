import { Component, OnInit, PLATFORM_ID, Inject, AfterContentInit, AfterContentChecked } from '@angular/core';
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
  faUser,
  faDollarSign,
  faSearch,
  faArchive,
  faHandHolding,
  faHandHoldingUsd,
  faBox,
  faMoneyBill,
  faCreditCard,
  faTags,
  faReceipt
} from '@fortawesome/free-solid-svg-icons';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../shared/models/auth.models';
import { PaymentService } from '../../shared/services/payment/payment.service';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../profile/services/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sidebarEnabled = true;
  toggleIconOn = faAngleRight;
  toggleIconOff = faAngleLeft;

  adminUser = false;

  sellerNavItems: DashboardSideNavItem[] = [
    {
      url: 'product/me',
      title: 'Listings',
      icon: faTag,
    },
    {
      url: 'stats/financials',
      title: 'Sales',
      icon: faReceipt,
    },
    {
      url: 'profile/edit',
      title: 'Profile',
      icon: faUser,
    }
  ];

  buyerNavItems: DashboardSideNavItem[] = [
    {
      url: 'product/owned',
      title: 'Owned',
      icon: faBox,
    }
  ];

  adminNavItems: DashboardSideNavItem[] = [
    {
      url: 'admin/submissions',
      title: 'Review Assets',
      icon: faArchive,
      isAdmin: true
    }
  ];

  securityContext: SecurityContext;

  constructor(
    private authService: AuthService,
    private router: Router,
    private paymentService: PaymentService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.sidebarEnabled = this.authService.getSideNavState();
    this.authService.sidebarEmitter.emit(this.sidebarEnabled);
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;
    });

    this.authService.securityCheck();

    if (!!this.securityContext.user) {
      this.userService.getUser(this.securityContext.user.uuid)
        .subscribe(res => {
          this.adminUser = res.isAdmin;
        });
    }
  }

  toggleSidebar(): any {
    this.sidebarEnabled = !this.sidebarEnabled;
    this.authService.setSideNavState(this.sidebarEnabled);
    this.authService.sidebarEmitter.emit(this.sidebarEnabled);
  }
}

interface DashboardSideNavItem {
  url: string;
  title: string;
  icon: any;
  isPaid?: boolean;
  isAdmin?: boolean;
}
