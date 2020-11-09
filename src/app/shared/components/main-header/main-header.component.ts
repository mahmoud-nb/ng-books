import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { nbrItemsCart, nCart } from 'src/app/store/selectors/cart.selectors';
import { StoreInterface } from 'src/app/store/store';
import { GlobalSearchService } from '../../services/global-search.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  count:number = 0 ;
  cartItemsCount:number = 0 ;

  term:string = '';

  constructor(private store: Store<StoreInterface>, private globalSearchService: GlobalSearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.select(nCart).subscribe( n => this.count = n );
    this.store.select(nbrItemsCart).subscribe( n => this.cartItemsCount = n );
  }

  search($event){
    $event.preventDefault();

    this.globalSearchService.setTerm(this.term);

    return false;
  }

}
