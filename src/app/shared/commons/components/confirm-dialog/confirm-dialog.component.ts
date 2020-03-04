import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'sm-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent implements OnInit {
  @Input() body: string | SafeHtml;
  @Input() title: string | SafeHtml;
  @Input() isDanger = true;
  @Input() isBodyHtml = false;
  @Input() isHeadingHtml = false;
  @Input() yesBtnTxt = 'Yes';
  @Input() noBtnTxt = 'No';
  @Output() confirm = new EventEmitter<boolean>();
  @HostBinding('class') klass = 'sm-modal-component';

  constructor(private readonly _cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  markAsStable() {
    this._cdr.markForCheck();
  }

}


