import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bag } from './bag';
import { bags } from './mock-bag';

export type Filter = 'all' | 'completed' | 'active';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  private items$ = new BehaviorSubject<Bag[]>(bags);
  private filter$ = new BehaviorSubject<Filter>('all');

  filteredItems(): Observable<Bag[]> {
    return combineLatest([
      this.items$,
      this.filter$
    ])
      .pipe(
        map(([items, filterValue]: [Bag[], Filter]) => {
          return items.filter((item: Bag) => {
            if (filterValue === 'all') {
              return !!item;
            }

            if (filterValue === 'completed') {
              return item.completed;
            }

            return !item.completed;
          });
        }),
      );
  }

  filteredItemsNumber(): Observable<number> {
    return this.filteredItems().pipe(
      map((items: Bag[]) => {
        return items.length;
      }),
    );
  }

  setFilter(filer: Filter) {
    this.filter$.next(filer);
  }

  add(item: Bag) {
    this.items$.next([...this.items$.getValue(), item]);
  }

  updateMessage(editedItem: Bag, message: string) {
    const newItems: Bag[] = this.items$.getValue().map((item: Bag) => {
      if (item === editedItem) {
        return { ...item, message };
      }
      return item;
    });

    this.items$.next(newItems);
  }

  toggleCompleted(toggledItem: Bag, completed: boolean) {
    const newItems: Bag[] = this.items$.getValue().map((item: Bag) => {
      if (item === toggledItem && item.completed !== completed) {
        return {...item, completed};
      }
      return item;
    });

    this.items$.next(newItems);
  }

  delete(deletedItem: Bag) {
    const newItems: Bag[] = this.items$.getValue().filter((item: Bag) => {
      return item !== deletedItem;
    });

    this.items$.next(newItems);
  }
}

