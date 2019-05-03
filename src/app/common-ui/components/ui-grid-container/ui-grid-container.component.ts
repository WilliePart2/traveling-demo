import { Component, Input, OnInit } from '@angular/core';
import { TAlignTypes, TJustifyTypes } from '../../common.ui.types';

@Component({
  selector: 'app-ui-grid-container',
  templateUrl: './ui-grid-container.component.html',
  styleUrls: ['./ui-grid-container.component.scss']
})
export class UiGridContainerComponent implements OnInit {
  @Input() isColumn: boolean;
  @Input() justify: TJustifyTypes;
  @Input() align: TAlignTypes;

  private get justifyClasses() {
    return {
      'ui-grid-container__justify--start': this.justify === TJustifyTypes.START,
      'ui-grid-container__justify--end': this.justify === TJustifyTypes.END,
      'ui-grid-container__justify--center': this.justify === TJustifyTypes.CENTER,
      'ui-grid-container__justify--space_between': this.justify === TJustifyTypes.SPACE_BETWEEN,
      'ui-grid-container__justify--space_around': this.justify === TJustifyTypes.SPACE_AROUND,
    };
  }

  private get alignClasses() {
    return {
      'ui-grid-container__align--start': this.align === TAlignTypes.START,
      'ui-grid-container__align--end': this.align === TAlignTypes.END,
      'ui-grid-container__align--center': this.align === TAlignTypes.CENTER,
      'ui-grid-container__align--baseline': this.align === TAlignTypes.BASELINE,
    };
  }

  get containerClasses() {
    let classHash: object = {};
    if (this.justify) {
      classHash = this.justifyClasses;
    }
    if (this.align) {
      classHash = {
        ...classHash,
        ...this.alignClasses
      };
    }

    return classHash;
  }

  constructor() { }

  ngOnInit() {}
}
