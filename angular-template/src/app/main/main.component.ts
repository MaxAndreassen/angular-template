import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { SecurityContext } from '../shared/models/auth.models';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  securityContext: SecurityContext;

  constructor(
    private authService: AuthService,
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

}
