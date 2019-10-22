import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, createSelector } from '@ngrx/store';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import {Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Container } from '../model';

@Injectable({ providedIn: 'root' })
export class ContainerService extends EntityCollectionServiceBase<Container> {
  page$: Observable<{pageIndex: number, pageCount: number}>;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private http: HttpClient) {
    super('Container', serviceElementsFactory);

    this.page$ = this.selectors$['page$'];
  }

}