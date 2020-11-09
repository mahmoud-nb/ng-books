import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../shared/models/book';
import { nCart } from '../store/selectors/cart.selectors';
import { AddBookAction } from '../store/actions/cart.actions';
import { StoreInterface } from '../store/store'


@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  @Input()  book: Book;
  count = 0 ;

  constructor(private store: Store<StoreInterface>) { 
    this.store.select(nCart).subscribe( n => this.count = n );
  }

  ngOnInit(): void {
  }

  addToCart(book: Book):void {
    
    this.store.dispatch( new AddBookAction(book) )
    //this.store.dispatch({ type: 'increament' })
  }

}
