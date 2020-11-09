
import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { BooksService } from '../shared/services/books.service';
import { GlobalSearchService } from '../shared/services/global-search.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books:Book[] = [];
  filteredBooks:Book[] = [];
  term:string = '';

  constructor(private booksService:BooksService, private globalSearchService: GlobalSearchService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe( res => {
      this.books = res;

      this.filteredBooks = this.filterBooks();
    });

    this.globalSearchService._term$.subscribe( t => { 
      this.term = t ;

      if(this.books.length > 0)
        this.filteredBooks = this.filterBooks();
    });
  }

  filterBooks():Book[] {
    return this.term ? this.books.filter( el => el.title.includes( this.term ) ) : this.books;
  }

}
