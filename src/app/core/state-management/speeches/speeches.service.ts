import { Injectable } from '@angular/core';

import { NgEntityService } from '@datorama/akita-ng-entity-service';

import { SpeechesState, SpeechesStore } from './speeches.store';

@Injectable({
  providedIn: 'root'
})
export class SpeechesService extends NgEntityService<SpeechesState> {

  constructor(readonly _speechesStore: SpeechesStore) {
    super(_speechesStore);
  }

}


