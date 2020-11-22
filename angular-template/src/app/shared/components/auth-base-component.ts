import { Inject, OnInit, PLATFORM_ID, Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { SecurityContext } from '../models/auth.models';
import { isPlatformServer } from '@angular/common';

@Component({
    selector: 'app-auth-base',
    template: `
    <div>
        base works!!
    </div>
`,
  })
export class AuthBaseComponent implements OnInit {
    public securityContext: SecurityContext = new SecurityContext();
    protected authSubscription: Subscription;

    constructor(
        protected authService: AuthService,
        @Inject(PLATFORM_ID) protected platformId: any,
    ) {
    }

    ngOnInit(): any {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        this.authSubscription = this.authService.authStateChange$.subscribe((context: SecurityContext) => {
            this.securityContext = context;
        });
    }
}
