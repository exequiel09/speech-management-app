import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { switchMap } from 'rxjs/operators';

import { Speech } from '../../models/speech.model';
import { SpeechesStore, SpeechesState } from './speeches.store';

@Injectable({
  providedIn: 'root'
})
export class SpeechesQuery extends QueryEntity<SpeechesState, Speech> {
  readonly selectedSpeech$ = this._routerQuery.selectParams('id').pipe(
    switchMap(id => this.selectEntity(id))
  );

  constructor(
    protected readonly store: SpeechesStore,
    private readonly _routerQuery: RouterQuery,
  ) {
    super(store);
  }

}


