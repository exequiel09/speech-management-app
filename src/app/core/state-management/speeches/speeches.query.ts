import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';

import { Speech } from '../../models/speech.model';
import { SpeechesStore, SpeechesState } from './speeches.store';

@Injectable({
  providedIn: 'root'
})
export class SpeechesQuery extends QueryEntity<SpeechesState, Speech> {

  constructor(protected readonly store: SpeechesStore) {
    super(store);
  }

}


