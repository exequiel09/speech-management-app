import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeechDetailsComponent, ViewMySpeechesComponent } from './modules/main';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/my-speeches',
    pathMatch: 'full'
  },

  {
    path: 'my-speeches',
    component: ViewMySpeechesComponent,
    children: [
      {
        path: ':id',
        component: SpeechDetailsComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
