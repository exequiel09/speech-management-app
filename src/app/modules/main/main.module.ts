import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AlertModule } from 'ngx-bootstrap/alert';

import { TruncatePipe } from './pipes/truncate.pipe';
import { ViewMySpeechesComponent } from './pages/view-my-speeches/view-my-speeches.component';
import { SpeechDetailsComponent } from './pages/speech-details/speech-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,

    AlertModule,
  ],
  declarations: [
    TruncatePipe,

    SpeechDetailsComponent,
    ViewMySpeechesComponent,
  ],
})
export class MainModule { }
