import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { NgEntityServiceLoader } from '@datorama/akita-ng-entity-service';
import { Subject } from 'rxjs';
import { delay, filter, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';

import { SpeechesQuery, SpeechesService } from '@speech-management/core/state-management';

@Component({
  selector: 'sm-view-my-speeches',
  templateUrl: './view-my-speeches.component.html',
  styleUrls: ['./view-my-speeches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewMySpeechesComponent implements OnDestroy, OnInit {
  readonly loaders = this._loader.loadersFor('speeches');
  readonly items$ = this._speechesQuery.selectAll();
  readonly hasSelectedSpeechParam$ = this._speechesQuery.hasSelectedSpeechParam$;
  readonly hasSelectedSpeech$ = this._speechesQuery.selectedSpeech$.pipe(
    map(speech => !!speech),

    shareReplay({
      bufferSize: 1,
      refCount: true,
    })
  );

  private readonly _unsubscribe$ = new Subject<any>();

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _ngZone: NgZone,
    private readonly _loader: NgEntityServiceLoader,
    private readonly _speechesQuery: SpeechesQuery,
    private readonly _speechesService: SpeechesService
  ) {
    this.loaders.get$
      .pipe(
        delay(100),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(loaded => {
        if (loaded) {
          // Side-effect to trigger the change detection since
          // `routerLinkActive` directive does not propagate changes to `isActive` property
          // if the parent component's change detection strategy is set to `OnPush`.
          this._cdr.markForCheck();
        }
      })
      ;
  }

  ngOnDestroy() {
    // push a notification value to terminate existing subscribers and complete the subject immediately
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() {
    this._speechesQuery.isLoaded$
      .pipe(
        tap(() => {
          // Side-effect to trigger the change detection since
          // `routerLinkActive` directive does not propagate changes to `isActive` property
          // if the parent component's change detection strategy is set to `OnPush`.
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              this._ngZone.run(() => this._cdr.markForCheck());
            }, 0);
          })
        }),

        filter(isLoaded => !isLoaded),
        switchMap(() => this._speechesService.get()),
        takeUntil(this._unsubscribe$)
      )
      .subscribe()
      ;
  }

}
