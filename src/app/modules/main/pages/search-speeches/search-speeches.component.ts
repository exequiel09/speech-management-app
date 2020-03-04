import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgEntityServiceLoader } from '@datorama/akita-ng-entity-service';
import { Subject } from 'rxjs';
import { delay, filter, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { SpeechesQuery, SpeechesService } from '@speech-management/core/state-management';

@Component({
  selector: 'sm-search-speeches',
  templateUrl: './search-speeches.component.html',
  styleUrls: ['./search-speeches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSpeechesComponent implements OnDestroy, OnInit {
  readonly loaders = this._loader.loadersFor('speeches');
  readonly items$ = this._speechesQuery.matchingSpeeches$;
  readonly searchQuery$ = this._speechesQuery.searchQuery$;
  readonly hasSearchQuery$ = this._speechesQuery.hasSearchQuery$;
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
    private readonly _router: Router,
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
          this._cdr.markForCheck();
        }
      })
      ;
  }

  handleSearch(q: string) {
    this._router.navigate(['/search-speeches'], {
      queryParams: {
        q,
      },
    });
  }

  ngOnDestroy() {
    // push a notification value to terminate existing subscribers and complete the subject immediately
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() {
    this._speechesQuery.isLoaded$
      .pipe(
        filter(isLoaded => !isLoaded),
        switchMap(() => this._speechesService.get()),
        takeUntil(this._unsubscribe$)
      )
      .subscribe()
      ;
  }

}


