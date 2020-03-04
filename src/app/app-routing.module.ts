import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  EditSpeechComponent,
  SpeechDetailsComponent,
  SubmitSpeechComponent,
  ViewMySpeechesComponent
} from './modules/main';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/my-speeches',
    pathMatch: 'full'
  },

  {
    path: 'submit-speech',
    component: SubmitSpeechComponent,
  },

  {
    path: 'my-speeches',
    component: ViewMySpeechesComponent,
    children: [
      {
        path: ':id',
        component: SpeechDetailsComponent
      },

      {
        path: ':id/edit',
        component: EditSpeechComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


