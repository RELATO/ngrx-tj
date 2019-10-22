import { Injectable } from '@angular/core';
import { DefaultPersistenceResultHandler, EntityAction } from '@ngrx/data';
import { Action } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class PagePersistenceResultHandler extends DefaultPersistenceResultHandler {
  handleSuccess(originalAction: EntityAction): (data: any) => Action {
    const actionHandler = super.handleSuccess(originalAction);
    return (data: any) => {
      const action = actionHandler(data);
      if (action && data && data.page) {
         (action as any).payload.page = data.page;
      }
      return action;
    };
  }
}
