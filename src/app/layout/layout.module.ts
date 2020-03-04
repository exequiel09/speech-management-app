import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NavbarComponent } from './containers/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,

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
