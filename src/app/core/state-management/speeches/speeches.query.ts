import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { Speech } from '../../models/speech.model';
import { SpeechesStore, SpeechesState } from './speeches.store';

@Injectable({
  providedIn: 'root'
})
export class SpeechesQuery extends QueryEntity<SpeechesState, Speech> {
  readonly isLoaded$ = this.select(['ids', 'loading']).pipe(
    map(({ ids, loading }: { ids: string[]; loading: boolean; }) => ids.length >= 0 && !loading)
  );

  readonly selectedSpeech$ = this._routerQuery.selectParams('id').pipe(
    switchMap((id: string) => this.selectEntity(id))
  );

  readonly hasSearchQuery$ = this._routerQuery.selectQueryParams('q').pipe(
    map((q: string | undefined) => !!q)
  );

  readonly matchingSpeeches$ = this._routerQuery.selectQueryParams('q').pipe(
    filter((q: string | undefined) => !!q),

    distinctUntilChanged(),

    switchMap((q: string) => {
      return this.selectAll({
        // WARN: if we have a large amount of entities this can be a bottleneck. For now, we'll let it be
        //       and mitigate it by limiting the number of results returned
        filterBy: entity => entity.content.toLowerCase().indexOf(q) > -1,
        limitTo: 50,
      });
    })
  );

  constructor(
    protected readonly store: SpeechesStore,
    private readonly _routerQuery: RouterQuery,
  ) {
    super(store);
  }

}


