import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { filterMethod, filterStore, NgEntityServiceNotifier, ofType } from '@datorama/akita-ng-entity-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { RawSpeech } from '@speech-management/core';
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
    private readonly _speechesQuery: SpeechesQuery,
    private readonly _speechesService: SpeechesService
  ) {
    this._notifier.action$
      .pipe(
        filterStore('speeches'),
        ofType('success'),
        filterMethod('PUT'),
        withLatestFrom(this.speech$),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(([, speech]) => {
        this._toastrService.success('Speech has been successfully updated', 'Speech Updated');
        this._router.navigate(['/my-speeches', speech.id]);
      })
      ;
  }

  ngOnDestroy() {
    // push a notification value to terminate existing subscribers and complete the subject immediately
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() { }

  handleSubmitSpeech(speech: RawSpeech) {
    const speech$ = this.speech$.pipe(take(1));

    speech$
      .pipe(
        switchMap(selectedSpeech => this._speechesService.update(selectedSpeech.id, speech))
      )
      .subscribe({
        error: (_error) => {
          this._toastrService.error('Something went wrong in updating the speech', 'Speech Update Failure');
        }
      })
      ;
  }

}


