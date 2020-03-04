import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@hackages/ngxerrors';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ShareViaEmailDialogComponent } from './components/share-via-email-dialog/share-via-email-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ModalModule,
    NgxErrorsModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    ShareViaEmailDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ShareViaEmailDialogComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    ShareViaEmailDialogComponent,
  ],
})
export class CommonsModule { }


