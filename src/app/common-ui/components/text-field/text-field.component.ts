import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IFormComponent} from '../../common.ui.types';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit, OnDestroy, IFormComponent {
  @Output() valueChange: EventEmitter = new EventEmitter<string>();
  @Input() label: string;
  @Input() placeholder = '';
  @Input() errorMsg: string;
  @Input() set value(val: string) {
    if (val) {
      this.textField.setValue(val);
    }
  }

  get isValid(): boolean {
    return this.textField.valid;
  }
  textField: FormControl = new FormControl('', [
    Validators.required
  ]);
  valueChangingSub: Subscription;
  constructor() { }

  ngOnInit() {
    this.valueChangingSub = this.textField.valueChanges.subscribe(
      (value: string) => {
        this.valueChange.emit(value);
      }
    );
  }

  ngOnDestroy(): void {
    this.valueChangingSub.unsubscribe();
  }

  reset(): void {
    this.textField.reset();
  }
}
