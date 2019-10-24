import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListEffects } from './hero-list.effects';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroesComponent } from './heroes/heroes.component';
import { InMemoryDataService } from './in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { ROOT_REDUCERS, metaReducers } from './reducers';
import {
  EntityDataModule,
  DefaultDataServiceConfig,
  HttpUrlGenerator,
  EntityDataService,
  PersistenceResultHandler,
  EntityCollectionReducerMethodsFactory,
} from '@ngrx/data';
import { entityConfig } from './store/entity-metadata';
import {
  CustomizeHttpUrlGenerator,
  CustomizeDataService,
  PagePersistenceResultHandler,
  EntityCollectionPageReducerMethodsFactory,
} from './customize-data';
import { ContainerInMemDataService } from './mock-web-api';
import { defaultDataServiceConfig } from './store/config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainersComponent } from './containers/containers.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects, HeroListEffects]),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EntityDataModule.forRoot(entityConfig),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    // HttpClientInMemoryWebApiModule.forRoot(ContainerInMemDataService, {
    //   delay: 1000,
    // }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig,
    },
    {
      provide: HttpUrlGenerator,
      useClass: CustomizeHttpUrlGenerator,
    },
    {
      provide: PersistenceResultHandler,
      useClass: PagePersistenceResultHandler,
    },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: EntityCollectionPageReducerMethodsFactory,
    },
    CustomizeDataService,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    private customizeDataService: CustomizeDataService
  ) {
    entityDataService.registerService('Container', customizeDataService);
  }
}
