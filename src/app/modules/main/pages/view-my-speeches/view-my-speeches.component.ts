import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-view-my-speeches',
  templateUrl: './view-my-speeches.component.html',
  styleUrls: ['./view-my-speeches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewMySpeechesComponent implements OnInit {
  items = [
    {
      id: 'asd721',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo nam quibusdam sequi laborum est repudiandae?',
      author: 'John Doe',
      keywords: ['fake', 'speech', 'test'],
      speechDate: '2020-03-10'
    },

    {
      id: 'asd722',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo nam quibusdam sequi laborum est repudiandae?',
      author: 'John Doe',
      keywords: ['fake', 'speech', 'test'],
      speechDate: '2020-03-10'
    },

    {
      id: 'asd723',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo nam quibusdam sequi laborum est repudiandae?',
      author: 'John Doe',
      keywords: ['fake', 'speech', 'test'],
      speechDate: '2020-03-10'
    }
  ]

  constructor() { }

  ngOnInit() { }

}
