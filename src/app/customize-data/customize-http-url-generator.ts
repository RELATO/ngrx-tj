import {Injectable} from '@angular/core';

import {DefaultHttpUrlGenerator, HttpResourceUrls} from '@ngrx/data';

@Injectable({providedIn: 'root'})
export class CustomizeHttpUrlGenerator extends DefaultHttpUrlGenerator {
  protected getResourceUrls(
    entityName: string,
    root: string
  ): HttpResourceUrls {
    const urls = super.getResourceUrls(entityName, root);
    urls.entityResourceUrl = urls.collectionResourceUrl;
    return urls;
  }
}