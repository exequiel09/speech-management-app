import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { take, tap } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface ConfirmModalOptions extends ModalOptions {
  isBodyHtml: boolean;
  isHeadingHtml: boolean;
  verticallyCentered: boolean;
  isDanger: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private readonly _domSanitizer: DomSanitizer,
    private readonly _bsModalService: BsModalService
  ) { }

  confirm(title: string, body: string, modalOptions: Partial<any> = {}) {
    const resolvedOptions = {
      ignoreBackdropClick: true,
      keyboard: false,
      ...modalOptions,
    };

    const modalRef = this._bsModalService.show(ConfirmDialogComponent, {
      ...resolvedOptions,
      class: `sm-modal-dialog -confirm modal-dialog-centered`,
    });

    const component = modalRef.content as ConfirmDialogComponent;
    component.isBodyHtml = !!modalOptions.isBodyHtml;
    component.isHeadingHtml = !!modalOptions.isHeadingHtml;
    component.isDanger = typeof modalOptions.isDanger !== 'undefined' ? modalOptions.isDanger : true;
    component.title = component.isHeadingHtml ? this._domSanitizer.bypassSecurityTrustHtml(title) : title;
    component.body = component.isBodyHtml ? this._domSanitizer.bypassSecurityTrustHtml(body) : body;

    const reply$ = component.confirm.pipe(
      tap(() => modalRef.hide()),

      take(1)
    );

    component.markAsStable();

    return {
      modalRef,
      component,
      reply$,
    };
  }

}


