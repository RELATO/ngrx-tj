import { Injectable } from '@angular/core';
import { EntityAction, EntityCacheAction, ofEntityOp, OP_ERROR, OP_SUCCESS, EntityOp } from '@ngrx/data';
import { Actions, ofType } from '@ngrx/effects';
import { filter } from 'rxjs/operators';

import {ContainerService} from './container.service';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private actions$: Actions, private containerService: ContainerService) {
    actions$
      .pipe(
        ofEntityOp(),
        filter(
          (ea: EntityAction) =>
          ea.payload.entityOp.endsWith(OP_ERROR)
        )
      )
      // this service never dies so no need to unsubscribe
      .subscribe(action => {
        if (action.payload.entityOp.endsWith(OP_ERROR)) {
          this.containerService.createAndDispatch(EntityOp.UNDO_ALL);
        }
      });

  }
}
