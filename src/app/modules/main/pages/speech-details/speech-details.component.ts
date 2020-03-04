import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { filterMethod, filterStore, NgEntityServiceNotifier, ofType } from '@datorama/akita-ng-entity-service';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { delay, switchMap, take, takeUntil } from 'rxjs/operators';

import { ModalService } from '@speech-management/shared/commons';
import { Speech } from '@speech-management/core';
import { SpeechesQuery, SpeechesService } from '@speech-management/core/state-management';

@Component({
  selector: 'sm-speech-details',
  templateUrl: './speech-details.component.html',
  styleUrls: ['./speech-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechDetailsComponent implements OnDestroy, OnInit {
  speech$ = this._speechesQuery.selectedSpeech$;

  private readonly _unsubscribe$ = new Subject<any>();

  constructor(
    private readonly _router: Router,
    private readonly _notifier: NgEntityServiceNotifier,
    private readonly _toastrService: ToastrService,
    private readonly _modalService: ModalService,
    private readonly _speechesService: SpeechesService,
    private readonly _speechesQuery: SpeechesQuery
  ) {
    this._notifier.action$
      .pipe(
        filterStore('speeches'),
        ofType('success'),
        filterMethod('DELETE'),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(() => {
        this._toastrService.success('Speech has been removed', 'Speech Removed');
        this._router.navigate(['/my-speeches']);
      })
      ;
  }

  handleDeleteSpeech(speech: Speech) {
    const { reply$ } = this._modalService.confirm('Delete Speech', 'Are you sure you want to delete this speech?');
    const replyOnce$ = reply$.pipe(take(1));

    replyOnce$
      .pipe(
        switchMap(reply => {
          if (!reply) {
            return of(null);
          }

          return this._speechesService.delete(speech.id);
        }),

        takeUntil(this._unsubscribe$)
      )
      .subscribe({
        error: (_error) => {
          this._toastrService.error('Something went wrong in delete the speech', 'Speech Removal Failure');
        }
      })
      ;
  }

  handleShareSpeech() {
    const { email$ } = this._modalService.shareViaEmail();
    const emailOnce$ = email$.pipe(take(1));

    emailOnce$
      .pipe(
        delay(300),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(() => {
        this._toastrService.success('Speech has been successfully shared', 'Speech Share Success');
      })
      ;
  }

  ngOnDestroy() {
    // push a notification value to terminate existing subscribers and complete the subject immediately
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() { }

}
