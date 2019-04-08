
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './category';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = [
      /*{ id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },*/
      { id: 1, name: 'Dining' },
      { id: 2, name: 'Gambling' },
      { id: 3, name: 'Entertainment' },
      { id: 4, name: 'Sports' },
      { id: 5, name: 'Shopping' }
    ];
    return {categories};
  }
 
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(categories: Category[]): number {
    return categories.length > 0 ? Math.max(...categories.map(category => category.id)) + 1 : 11;
  }
}


