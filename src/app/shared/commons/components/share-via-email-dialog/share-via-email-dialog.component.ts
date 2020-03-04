import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxErrorsDirective } from '@hackages/ngxerrors';

@Component({
  selector: 'sm-share-via-email-dialog',
  templateUrl: './share-via-email-dialog.component.html',
  styleUrls: ['./share-via-email-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareViaEmailDialogComponent implements OnInit {
  form: FormGroup;

  @ViewChild('emailErrors') emailErrors: NgxErrorsDirective;
  @Output() share = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<any>();
  @HostBinding('class') klass = 'sm-modal-component';

  get emailInvalid() {
    if (!this.emailErrors) {
      return false;
    }

    return (
      this.emailErrors.hasError('required', 'touched') ||
      this.emailErrors.hasError('email', 'dirty')
    );
  }

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _fb: FormBuilder
  ) {
    this.form = this.createForm();
  }

  createForm() {
    return this._fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]]
    });
  }

  ngOnInit() { }

  markAsStable() {
    this._cdr.markForCheck();
  }

}
