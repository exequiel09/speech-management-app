import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NavbarComponent } from './containers/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    CollapseModule,
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class LayoutModule { }
