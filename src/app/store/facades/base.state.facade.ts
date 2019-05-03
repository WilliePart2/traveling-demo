import { IStateFacade } from '../store.types';
import { QueryEntity } from '@datorama/akita';

export class BaseStateFacade implements IStateFacade {
  constructor(protected query: QueryEntity<any, any>) {}

  generateId(): number {
    return this.query.getCount() + 1;
  }
}
