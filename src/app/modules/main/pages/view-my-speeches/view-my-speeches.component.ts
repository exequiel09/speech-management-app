import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SpeechesQuery, SpeechesService } from '@speech-management/core/state-management';

@Component({
  selector: 'sm-view-my-speeches',
  templateUrl: './view-my-speeches.component.html',
  styleUrls: ['./view-my-speeches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewMySpeechesComponent implements OnInit {
  items$ = this._speechesQuery.selectAll();

  constructor(
    private readonly _speechesQuery: SpeechesQuery,
    private readonly _speechesService: SpeechesService
  ) { }

  ngOnInit() {
    this._speechesService.get().subscribe();
  }

}
