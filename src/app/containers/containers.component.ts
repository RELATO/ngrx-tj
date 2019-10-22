import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {Container} from '../model/container';
import {ContainerService} from '../service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  query: string;
  querySubject = new Subject<string>();
  containers$: Observable<Container[]>;
  loading$: Observable<boolean>;
  page$: Observable<{pageIndex: number, pageCount: number}>;
  constructor(private containerService: ContainerService) { }

  ngOnInit() {
    // dispatch action
    this.containerService.getAll();
    // selector to get all entities
    this.containers$ = this.containerService.filteredEntities$;
    this.loading$ = this.containerService.loading$;
    this.querySubject.pipe(
      debounceTime(300), 
      distinctUntilChanged()).subscribe(filter => this.containerService.setFilter(filter));

    this.page$ = this.containerService.page$;
  }

  add() {
    this.containerService.add({name: 'centos'});
  }

  delete() {
    this.containerService.delete(1);
  }

  update() {
    this.containerService.update({id: 1, name: 'ubuntu:18.03'});
  }

  updateFailed() {
    this.containerService.update({id: 2, name: 'ubuntu:18.03'});
  }

  getById(id: number) {
    this.containerService.getByKey(1);
  }

  getWithQuery(pageIndex = 1) {
    this.containerService.clearCache();
    this.containerService.getWithQuery({pageIndex: pageIndex.toString()});
  }

  queryChanged(event: any) {
    this.query = event;
    this.querySubject.next(this.query);
  }
}