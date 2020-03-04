import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Speech } from '../../models/speech.model';

export interface SpeechesState extends EntityState<Speech> { }

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'speeches'
})
export class SpeechesStore extends EntityStore<SpeechesState, Speech> {

  constructor() {
    super();
  }

}


