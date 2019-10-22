import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultDataService, HttpUrlGenerator, Logger,
  QueryParams } from '@ngrx/data';

import { Container } from '../model';

@Injectable({ providedIn: 'root' })
export class CustomizeDataService extends DefaultDataService<Container> {
   constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('Container', http, httpUrlGenerator);
    logger.log('Created custom Container EntityDataService');
  }
  getAll(): Observable<Container[]> {
    return super.getAll().pipe(map(
      containers => containers.map(container => 
      ({ 
        ...container, 
        fullName: (container.name + ' ' + (container.tag || '')) 
       }))));
  }

  getWithQuery(params: string | QueryParams): Observable<Container[]> {
    const pageIndex = params['pageIndex'] || '1';
    return this.http.get(`api/containers?pageIndex=${pageIndex}`).pipe(map((data: any) => {
      const containers = data.data;
      containers.page = data.page;
      return containers as any;
    }));
  }
}