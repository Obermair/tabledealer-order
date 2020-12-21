import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bag } from './bag';
import { Filter, BagService } from './bag.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'ngx-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit {

  
  items$: Observable<Bag[]>;
  itemsNumber$: Observable<number>;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private bagService: BagService, private fb: FormBuilder) {
    this.items$ = this.bagService.filteredItems();
    this.itemsNumber$ = this.bagService.filteredItemsNumber();
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

  
  

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

}
