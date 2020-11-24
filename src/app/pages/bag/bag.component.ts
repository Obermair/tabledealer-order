import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bag } from './bag';
import { Filter, BagService } from './bag.service';

@Component({
  selector: 'ngx-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit {

  
  items$: Observable<Bag[]>;
  itemsNumber$: Observable<number>;

  constructor(private bagService: BagService) {
    this.items$ = this.bagService.filteredItems();
    this.itemsNumber$ = this.bagService.filteredItemsNumber();
  }

  ngOnInit(){
    
  }

  changeFilter(filterValue: Filter) {
    this.bagService.setFilter(filterValue);
  }

  onAdd(message: string) {
    if (message.trim()) {
      this.bagService.add({ message, completed: false });
    }
  }

  onSave([item, message]: [Bag, string]) {
    this.bagService.updateMessage(item, message);
  }

  onToggleCompleted([item, completed]: [Bag, boolean]) {
    this.bagService.toggleCompleted(item, completed);
  }

  onDelete(item) {
    this.bagService.delete(item);
  }

}
