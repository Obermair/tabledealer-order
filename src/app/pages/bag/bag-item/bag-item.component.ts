import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { Bag } from '../bag';

@Component({
  selector: 'td-bag-item',
  templateUrl: './bag-item.component.html',
  styleUrls: ['./bag-item.component.scss']
})
export class BagItemComponent {

  @ViewChild('input', { static: false }) input: ElementRef;
  @HostBinding('class.completed')
  get completed() {
    return this.item.completed;
  }

  @Input() item: Bag;
  @Output() save = new EventEmitter<[Bag, string]>();
  @Output() delete = new EventEmitter<Bag>();
  @Output() toggleComplete = new EventEmitter<[Bag, boolean]>();

  onEdit(item: Bag) {
    item.inEdit = true;
    setTimeout(() => this.input.nativeElement.focus());
  }

  onSave(item: Bag, message: string) {
    item.inEdit = false;
    this.save.emit([item, message]);
  }

  onDelete(item: Bag) {
    this.delete.emit(item);
  }

  onToggleComplete(item: Bag, completed: boolean) {
    this.toggleComplete.emit([item, completed]);
  }

}
