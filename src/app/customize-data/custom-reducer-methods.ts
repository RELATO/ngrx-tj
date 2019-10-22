import { Injectable } from '@angular/core';
import {
  EntityCollectionReducerMethodMap, EntityDefinitionService,
  EntityAction,
  EntityChangeTracker,
  EntityCollection,
  EntityCollectionReducerMethods,
  EntityDefinition
} from '@ngrx/data';


@Injectable()
export class EntityCollectionPageReducerMethodsFactory {
  constructor(private entityDefinitionService: EntityDefinitionService) { }

  /** Create the  {EntityCollectionReducerMethods} for the named entity type */
  create<T>(entityName: string): EntityCollectionReducerMethodMap<T> {
    const definition = this.entityDefinitionService.getDefinition<T>(entityName);
    const methodsClass = new EntityCollectionPageReducerMethods(entityName, definition);

    return methodsClass.methods;
  }
}


export class EntityCollectionPageReducerMethods<T> extends EntityCollectionReducerMethods<T> {
  constructor(public entityName: string, public definition: EntityDefinition<T>) {
    super(entityName, definition);
  }

  protected queryManySuccess(
    collection: EntityCollection<T>,
    action: EntityAction<T[]>
  ): EntityCollection<T> {
    const ec = super.queryManySuccess(collection, action);
    if ((action.payload as any).page) {
      (ec as any).page = (action.payload as any).page;
    }
    return ec;
  }

  protected removeAll(
    collection: EntityCollection<T>,
    action: EntityAction<T>
  ): EntityCollection<T> {
    const ec = super.removeAll(collection, action);
    (ec as any).page = undefined;
    return ec;
  }
}
