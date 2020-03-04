import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgxErrorsModule } from '@hackages/ngxerrors';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

import { TruncatePipe } from './pipes/truncate.pipe';
import { SpeechFormComponent } from './components/speech-form/speech-form.component';
import { ViewMySpeechesComponent } from './pages/view-my-speeches/view-my-speeches.component';
import { SpeechDetailsComponent } from './pages/speech-details/speech-details.component';
import { EditSpeechComponent } from './pages/edit-speech/edit-speech.component';
import { SubmitSpeechComponent } from './pages/submit-speech/submit-speech.component';
import { SearchSpeechesComponent } from './pages/search-speeches/search-speeches.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollingModule,

    AlertModule,
    BsDatepickerModule,
    NgSelectModule,
    NgxErrorsModule,
    ToastrModule,
  ],
  declarations: [
    TruncatePipe,

    SpeechFormComponent,

    EditSpeechComponent,
    SpeechDetailsComponent,
    ViewMySpeechesComponent,
    SubmitSpeechComponent,
    SearchSpeechesComponent,
  ],
})
export class MainModule { }


