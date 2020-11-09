import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { BookComponent } from './book/book.component';
import { BookItemComponent } from './book-item/book-item.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { StoreModule } from '@ngrx/store';
import { redusers } from './store/store';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainFooterComponent,
    BooksComponent,
    BookComponent,
    BookItemComponent,
    TruncatePipe,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot(redusers, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
