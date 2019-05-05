import { IStateFacade } from '../store.types';
import { QueryEntity } from '@datorama/akita';

export class BaseStateFacade implements IStateFacade {
  private idCounter: number;
  constructor(protected query: QueryEntity<any, any>) {
    this.idCounter = query.getCount();
  }

  generateId(): number {
    this.idCounter += 1;
    return this.idCounter;
  }
}
