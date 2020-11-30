import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [MainComponent, SideNavComponent],
  exports: [SideNavComponent]
})
export class MainModule { }
