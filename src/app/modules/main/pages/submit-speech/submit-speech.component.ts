import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { guid } from '@datorama/akita';
import { filterMethod, filterStore, NgEntityServiceNotifier, ofType } from '@datorama/akita-ng-entity-service';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { RawSpeech, Speech } from '@speech-management/core';
import { SpeechesService } from '@speech-management/core/state-management';

@Component({
  selector: 'sm-submit-speech',
  templateUrl: './submit-speech.component.html',
  styleUrls: ['./submit-speech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitSpeechComponent implements OnDestroy, OnInit {
  private readonly _unsubscribe$ = new Subject<any>();

  constructor(
    private readonly _router: Router,
    private readonly _notifier: NgEntityServiceNotifier,
    private readonly _toastrService: ToastrService,
    private readonly _speechesService: SpeechesService
  ) {
    this._notifier.action$
      .pipe(
        filterStore('speeches'),
        ofType('success'),
        filterMethod('POST'),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(() => {
        this._toastrService.success('Speech has been successfully saved', 'Speech Saved');
        this._router.navigate(['/my-speeches']);
      })
      ;
  }

  handleSubmitSpeech(rawSpeech: RawSpeech) {
    const speech: Speech = {
      ...rawSpeech,
      id: guid(),
    };

    this._speechesService.add(speech)
      .pipe(
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



