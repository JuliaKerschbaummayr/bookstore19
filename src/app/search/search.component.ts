import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/internal/operators';
import {switchTap} from '@angular/router/src/operators/switch_tap';
import {BookStoreService} from '../shared/book-store.service';
import {Book} from '../shared/book';

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor(private bs: BookStoreService) { }

  isLoading = false;
  keyup = new EventEmitter<string>();
  foundBooks: Book[] = [];
  @Output() bookSelected = new EventEmitter<Book>();

  ngOnInit() {
    this.keyup.
        pipe(debounceTime(500)).
        pipe(distinctUntilChanged()).
        pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm))).
        pipe(tap(()=>this.isLoading = true)).
    subscribe((books) => {
        this.foundBooks = books;
        console.log(this.foundBooks)});
  }

}