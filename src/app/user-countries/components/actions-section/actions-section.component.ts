import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActionSeectionComponent } from '../../user.countries.types';
import { CommonTexts } from '../../../configuration/models/common.texts';
import { MainConfigService } from '../../../configuration/services/main.config.service';

@Component({
  selector: 'app-actions-section',
  templateUrl: './actions-section.component.html',
  styleUrls: ['./actions-section.component.scss']
})
export class ActionsSectionComponent implements OnInit, IActionSeectionComponent {
  @Output() saveChangesFired: EventEmitter<void> = new EventEmitter<void>();
  @Input() canAcceptAction: boolean;
  texts: CommonTexts;

  constructor(private config: MainConfigService) {
    this.texts = config.commonTexts();
  }

  ngOnInit() {
  }

  onSaveChanges(): void {
    this.saveChangesFired.emit();
  }

}
