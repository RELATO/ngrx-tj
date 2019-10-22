import {EntityMetadataMap, PropsFilterFnFactory} from '@ngrx/data';

import {Container} from '../model';

export function containerNameFilterFn(containers: Container[], pattern: string) {
  return PropsFilterFnFactory(['name'])(containers, pattern);
}

export const entityMetadata: EntityMetadataMap = {
  Container: {
    filterFn: containerNameFilterFn,
    entityDispatcherOptions: {
      optimisticUpdate: true
    },
    sortComparer: (a: Container, b: Container) => b.id - a.id,
    additionalCollectionState: { page: {} }
  }
};

export const entityConfig = {
  entityMetadata
}
