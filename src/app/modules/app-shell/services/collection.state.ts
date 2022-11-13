import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollectionEntity } from './../models/entities/collection.entity';

@Injectable()
export class CollectionState {
  private readonly _collections$: BehaviorSubject<CollectionEntity[]>;

  constructor() {
    this._collections$ = new BehaviorSubject<CollectionEntity[]>([]);
  }

  set(value: CollectionEntity[]) {
    this._collections$.next(value);
  }

  add(value: CollectionEntity) {
    const currentValue = this._collections$.getValue();
    this._collections$.next([...currentValue, value]);
  }

  update(id: string, value: CollectionEntity) {
    const currentValue = this._collections$.getValue();
    const index = currentValue.findIndex(item => item.id === id);
    currentValue[index] = value;
    this._collections$.next([...currentValue]);
  }

  remove(id: string) {
    const currentValue = this._collections$.getValue();
    this._collections$.next(currentValue.filter(item => item.id !== id));
  }
}
