import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CART_OFFER, OFFER } from '../shared/models/offers';
import { BooksService } from '../shared/services/books.service';
import { RemoveBookAction } from '../store/actions/cart.actions';
import { CartItem } from '../store/reducers/cart.reducer';
import { cartItems } from '../store/selectors/cart.selectors';
import { StoreInterface } from '../store/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Array<CartItem> = [];
  offers: Array<OFFER>;

  cartTotalPrice: Number = 0 ;

  discountedPrice: Number = null ;
  appliedOffer: OFFER = null ;

  bestOffer: CART_OFFER = null;

  constructor(private store: Store<StoreInterface>, private booksService:BooksService) { }

  ngOnInit(): void {
    this.store.select(cartItems).subscribe( items => { 
      this.cartItems = items ;

      if( this.cartItems.length > 0 ){
        this.cartTotalPrice = items.length > 0 ? items.map( item => Number(item.item.price) * Number(item.qty) ).reduce( (a, b) => Number(a) + Number(b) ) : 0 ;

        let isbns = this.cartItems.map( el => el.item.isbn );
        const params = isbns.join(',');
  
        this.booksService.getCommercialOffers(params).subscribe( commercialOffers => { 
          this.offers = commercialOffers.offers; 

          this.getBestOffer(this.cartTotalPrice, this.offers);
        });
      }
    });
  }

  getTotalPrice(): Number{
    return this.bestOffer ? (Number(this.cartTotalPrice) - Number(this.bestOffer.discounte)) : this.cartTotalPrice ;
  }

  getBestOffer(price: Number, offers: Array<OFFER>){
    
    if(offers && offers.length > 0){
      const percentageOffer = offers.find( el => el.type == 'percentage' );

      const minusOffer = offers.find( el => el.type == 'minus' );

      const sliceOffer = offers.find( el => el.type == 'slice' );

      let _offers = offers.map( offer => {
        return {
          offer: offer,
          offerDisplayName: this.getOfferDisplayName(offer),
          discounte: this.getDiscountByOffer(this.cartTotalPrice, offer)
        }
      });

      _offers = _offers.sort( (a,b) => Number(b.discounte) - Number(a.discounte) );

      this.bestOffer = _offers[0];

      console.log('_offers :::: ', _offers, this.bestOffer);
    }
  }

  getOfferDisplayName(offer: OFFER): String{
    switch (offer.type){
      case "percentage":
        return `Discount ( -${offer.value}% )` ;
      case "minus":
        return `Discount ( -${offer.value}€ )` ;
      case "slice":
        return `Discount ( -${offer.value}€ by ${offer.sliceValue}€ )` ;
      default:
            return '';
    }
  }

  getDiscountByOffer(price: Number, offer: OFFER) : Number {
    switch (offer.type){
      case "percentage":
        return this.getPriceByPercentage(price, offer.value) ;
      case "minus":
        return this.getPriceByminus(price, offer.value) ;
      case "slice":
        return this.getPriceBySlice(price, offer.sliceValue, offer.value) ;
      default:
            return 0;
    }
  }

  getPriceByPercentage(price: Number, percentage: Number): Number{
    return (Number(price) * Number(percentage)) / 100 ;
  }

  getPriceByminus(price, minus): Number{
    return price >= minus ? minus : price ;
  }

  getPriceBySlice(price, slice, value): Number{
    return price >= slice ? Math.floor( price / slice ) * value : 0 ;
  }

  sendCart(){
    console.log("SEND CART");
  }

  removeItem(event, cartItem){
    this.store.dispatch( new RemoveBookAction(cartItem.item) )
  }

}
