import { EntityState, QueryEntity } from '@datorama/akita';
import { IUser } from '../../users/users.types';

export class BaseQuery<S, E> extends QueryEntity<S, E> {
  getEntitiesAsArray<T>(): T[] {
    const entities: { [key: number]: T } = (this.getValue() as EntityState<T>).entities;
    const result: T[] = [];
    if (entities) {
      const length = Object.keys(entities).length;
      for (let i = 0; i < length; i++) {
        const value: T = entities[i];
        if (value !== undefined) {
          result.push(value);
        }
      }
    }
    return result;
  }
}
