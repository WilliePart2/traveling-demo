import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IFormComponent, IListItem} from '../../common.ui.types';
import {Observable, ObservableInput, Subscription} from 'rxjs';
import {MatSelectionList, MatSelectionListChange} from '@angular/material';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit, IFormComponent {
  @Input() items: Observable<IListItem>;

  @Output() itemSelected: EventEmitter = new EventEmitter<IListItem>();
  @ViewChild('selectionList') selectionList: MatSelectionList;
  selectionSub: Subscription;
  selectedItem: IListItem;
  isValid: boolean;

  constructor() { }

  ngOnInit() {
    this.selectionSub = this.selectionList.selectionChange.subscribe(
      (selectedValue: MatSelectionListChange) => {
        const isSelected: boolean = selectedValue.option.selected;
        this.selectedItem = isSelected ? selectedValue.option.value as IListItem : null;
        this.selectItem(this.selectedItem);
      }
    );
  }

  reset(): void {
    this.selectionList.deselectAll();
  }

  selectItem(item: IListItem) {
    this.itemSelected.emit(item);
  }

  filterSelection(optionValue: number, selectedValue: number): boolean {
    return optionValue === selectedValue;
  }
}
