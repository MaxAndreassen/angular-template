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
import { Account } from '../../shared/models/payment.models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sidebarEnabled = true;
  toggleIconOn = faAngleRight;
  toggleIconOff = faAngleLeft;
  sellIcon = faDollarSign;

  adminUser = false;
  paymentCheckLoading = false;

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
      url: 'stats/financials/payout',
      title: 'Payout',
      icon: faDollarSign
      ,
    }
  ];

  otherNavItems: DashboardSideNavItem[] = [
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
  account: Account = new Account();

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

    this.account.chargesEnabled = this.authService.getChargesEnabled();
    this.securityContext = this.authService.securityContext;
    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      if (!!context && !!context.user) {
        if (this.securityContext == null ||
          context.authenticated !== this.securityContext.authenticated || this.securityContext.user.uuid !== context.user.uuid) {
          this.paymentCheckLoading = true;

          this.paymentService
            .getAccount(context.user.uuid)
            .pipe(finalize(() => this.paymentCheckLoading = false))
            .subscribe(result => {
              this.account = result;
              this.authService.setChargesEnabled(result.chargesEnabled);
            });

          this.userService.getUser(context.user.uuid)
            .subscribe(res => {
              this.adminUser = res.isAdmin;
            });
        } else {
          if (!context || !context.user) {
            this.authService.setChargesEnabled(false);
            this.account = new Account();
          }
        }
      }


      this.securityContext = context;
    });

    this.authService.securityCheck();
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
