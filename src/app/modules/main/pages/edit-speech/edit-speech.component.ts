import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { filterMethod, filterStore, NgEntityServiceNotifier, ofType } from '@datorama/akita-ng-entity-service';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { delay, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { ModalService } from '@speech-management/shared/commons';
import { RawSpeech, Speech } from '@speech-management/core';
import { SpeechesQuery, SpeechesService } from '@speech-management/core/state-management';

@Component({
  selector: 'sm-edit-speech',
  templateUrl: './edit-speech.component.html',
  styleUrls: ['./edit-speech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSpeechComponent implements OnDestroy, OnInit {
  speech$ = this._speechesQuery.selectedSpeech$;

  private readonly _unsubscribe$ = new Subject<any>();

  constructor(
    private readonly _router: Router,
    private readonly _notifier: NgEntityServiceNotifier,
    private readonly _toastrService: ToastrService,
    private readonly _modalService: ModalService,
    private readonly _speechesQuery: SpeechesQuery,
    private readonly _speechesService: SpeechesService
  ) {
    const speechSuccessActions$ = this._notifier.action$.pipe(
      filterStore('speeches'),
      ofType('success')
    );

    speechSuccessActions$
      .pipe(
        filterMethod('PUT'),
        withLatestFrom(this.speech$),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(([, speech]) => {
        this._toastrService.success('Speech has been successfully updated', 'Speech Updated');
        this._router.navigate(['/my-speeches', speech.id]);
      })
      ;

    speechSuccessActions$
      .pipe(
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
        switchMap((reply) => {
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

  handleSubmitSpeech(speech: RawSpeech) {
    const speech$ = this.speech$.pipe(take(1));

    speech$
      .pipe(
        switchMap(selectedSpeech => this._speechesService.update(selectedSpeech.id, speech)),

        takeUntil(this._unsubscribe$)
      )
      .subscribe({
        error: (_error) => {
          this._toastrService.error('Something went wrong in updating the speech', 'Speech Update Failure');
        }
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


