import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'sm-speech-search-form',
  templateUrl: './speech-search-form.component.html',
  styleUrls: ['./speech-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechSearchFormComponent implements OnChanges, OnInit {
  form: FormGroup;

  @Input() initialSearch: string;
  @Output() search = new EventEmitter<string>();

  constructor(private readonly _fb: FormBuilder) {
    this.form = this.createForm();
  }

  createForm() {
    return this._fb.group({
      q: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.initialSearch && !!changes.initialSearch.currentValue) {
      this.form.patchValue({
        q: changes.initialSearch.currentValue,
      });
    }
  }

  ngOnInit() { }

  submit() {
    this.search.emit(this.form.value.q as string);
  }

}


