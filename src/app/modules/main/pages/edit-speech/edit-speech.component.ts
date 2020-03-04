import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { switchMap, take } from 'rxjs/operators';

import { RawSpeech } from '@speech-management/core';
import { SpeechesQuery, SpeechesService } from '@speech-management/core/state-management';

@Component({
  selector: 'sm-edit-speech',
  templateUrl: './edit-speech.component.html',
  styleUrls: ['./edit-speech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSpeechComponent implements OnInit {
  speech$ = this._speechesQuery.selectedSpeech$;

  constructor(
    private readonly _speechesQuery: SpeechesQuery,
    private readonly _speechesService: SpeechesService
  ) { }

  ngOnInit() { }

  handleSubmitSpeech(speech: RawSpeech) {
    const speech$ = this.speech$.pipe(take(1));

    speech$
      .pipe(
        switchMap(selectedSpeech => {
          return this._speechesService.update(selectedSpeech.id, speech)
        })
      )
      .subscribe({
        error: (error) => console.log(error)
      })
      ;
  }

}


