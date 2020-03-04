import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sm-search-speeches',
  templateUrl: './search-speeches.component.html',
  styleUrls: ['./search-speeches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSpeechesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
