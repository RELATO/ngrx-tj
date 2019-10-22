import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, RequestInfoUtilities, ResponseOptions } from 'angular-in-memory-web-api';

// tslint:disable:no-unused-variable
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// tslint:enable:no-unused-variable
const containers = [
      { id: 1, name: 'ubuntu', tag: 'latest'},
      { id: 2, name: 'alpine', tag: '1.0' },
      { id: 3, name: 'openmpi' },
      { id: 4, name: 'cuda' }
    ];

@Injectable()
export class ContainerInMemDataService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo) {


    const nobodies: any[] = [ ];


    // default returnType
    let returnType  = 'object';
    // let returnType  = 'observable';
    // let returnType  = 'promise';

    // demonstrate POST commands/resetDb
    // this example clears the collections if the request body tells it to do so
    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        containers.length = 0;
        nobodies.length = 0;
      }

      // 'returnType` can be 'object' | 'observable' | 'promise'
      returnType = body.returnType || 'object';
    }
    const db = { containers };

    switch (returnType) {
      case ('observable'):
        return of(db).pipe(delay(10));
      case ('promise'):
        return new Promise(resolve => {
          setTimeout(() => resolve(db), 10);
        });
      default:
        return db;
    }
  }

  parseRequestUrl(url: string, utils: RequestInfoUtilities) {
    // const newUrl = url.replace('containers', 'container').replace('container', 'containers');
    const parsed = utils.parseRequestUrl(url);
    return parsed;
  }

  responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {


    const method = reqInfo.method.toUpperCase();
    const body = JSON.stringify(resOptions);
    console.log(`responseInterceptor: ${method} ${reqInfo.req.url}: \n${body}`);
    if (reqInfo.req.url === 'api/containers/2') {
      throw new Error('Can not update id 2');
    }

    if (reqInfo.req.url === 'api/containers?pageIndex=1') {
      resOptions.body = {data: containers.slice(0, 2), page : {pageCount: 2, pageIndex: 1}};
    } else if (reqInfo.req.url === 'api/containers?pageIndex=2') {
      resOptions.body = {data: containers.slice(2, 4), page: {pageCount: 2, pageIndex: 2}};
    }

    return resOptions;
  }

}
