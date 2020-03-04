import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-speech-details',
  templateUrl: './speech-details.component.html',
  styleUrls: ['./speech-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
