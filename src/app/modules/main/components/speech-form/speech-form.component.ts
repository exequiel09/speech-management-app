import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { format, parse } from 'date-fns';
import { CustomValidators } from 'ngx-custom-validators';

import { RawSpeech, Speech } from '@speech-management/core';

@Component({
  selector: 'sm-speech-form',
  templateUrl: './speech-form.component.html',
  styleUrls: ['./speech-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechFormComponent implements OnChanges, OnInit {
  form: FormGroup;

  @ViewChild('authorErrors') authorErrors: NgxErrorsDirective;
  @ViewChild('keywordsErrors') keywordsErrors: NgxErrorsDirective;
  @ViewChild('speechContentErrors') speechContentErrors: NgxErrorsDirective;
  @ViewChild('speechDateErrors') speechDateErrors: NgxErrorsDirective;
  @Input() speech: Speech;
  @Output() deleteSpeech = new EventEmitter<Speech>();
  @Output() shareSpeech = new EventEmitter<any>();
  @Output() submitSpeech = new EventEmitter<RawSpeech>();

  get authorInvalid() {
    if (!this.authorErrors) {
      return false;
    }

    return this.authorErrors.hasError('required', 'touched');
  }

  get contentInvalidInvalid() {
    if (!this.speechContentErrors) {
      return false;
    }

    return this.speechContentErrors.hasError('required', 'touched');
  }

  get keywordsInvalid() {
    if (!this.keywordsErrors) {
      return false;
    }

    return (
      this.keywordsErrors.hasError('required', 'touched') ||
      this.keywordsErrors.hasError('arrayLength', 'dirty')
    );
  }

  get speechDateInvalid() {
    if (!this.speechDateErrors) {
      return false;
    }

    return this.speechDateErrors.hasError('required', 'touched');
  }

  constructor(private readonly _fb: FormBuilder) {
    this.form = this.createForm();
  }

  createForm() {
    return this._fb.group({
      content: ['', [
        Validators.required,
      ]],
      keywords: [[], [
        Validators.required,
        CustomValidators.arrayLength(1),
      ]],
      author: ['', [
        Validators.required,
      ]],
      speechDate: [null, [
        Validators.required,
      ]]
    });
  }

  handleDeleteSpeech(speech: Speech) {
    this.deleteSpeech.emit(speech);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.speech && !!changes.speech.currentValue) {
      const { speechDate, ...remaining } = changes.speech.currentValue as Speech;
      const toDate = parse(speechDate, 'yyyy-MM-dd', new Date());

      this.form.patchValue({
        ...remaining,
        speechDate: toDate,
      });
    }
  }

  ngOnInit() { }

  submit() {
    if (!this.form.valid) {
      return;
    }

    const { speechDate, ...remaining } = this.form.value;
    const stringifiedDate = format(speechDate as Date, 'yyyy-MM-dd');

    this.submitSpeech.emit({
      ...remaining,
      speechDate: stringifiedDate,
    } as RawSpeech);
  }

}


