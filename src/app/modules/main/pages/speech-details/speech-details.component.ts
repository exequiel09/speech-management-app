import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SpeechesQuery } from '@speech-management/core/state-management';

@Component({
  selector: 'sm-speech-details',
  templateUrl: './speech-details.component.html',
  styleUrls: ['./speech-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechDetailsComponent implements OnInit {
  speech$ = this._speechesQuery.selectedSpeech$;

  constructor(private readonly _speechesQuery: SpeechesQuery) { }

  ngOnInit() { }

}
