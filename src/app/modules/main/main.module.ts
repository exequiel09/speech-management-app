import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TruncatePipe } from './pipes/truncate.pipe';
import { ViewMySpeechesComponent } from './pages/view-my-speeches/view-my-speeches.component';
import { SpeechDetailsComponent } from './pages/speech-details/speech-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,
  ],
  declarations: [
    TruncatePipe,

    ViewMySpeechesComponent,

    SpeechDetailsComponent,
  ],
})
export class MainModule { }
