import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem, CartStore } from '../reducers/cart.reducer';

let cartStoreFS = createFeatureSelector<CartStore>('cartStore')
export let nCart = createSelector( cartStoreFS, state => getTotalQty(state.items) );  
export let nbrItemsCart = createSelector( cartStoreFS, state => state.items.length );
export let totalPrice = createSelector( cartStoreFS, state => getTotalPrice(state.items) );
export let cartItems = createSelector( cartStoreFS, state => state.items );


function getTotalQty(items: Array<CartItem>): any{
    return items.length > 0 ? items.map( item => item.qty ).reduce( (a, b) => Number(a) + Number(b) ) : 0 ;
}

function getTotalPrice(items: Array<CartItem>): any{
    return items.length > 0 ? items.map( item => item.item.price ).reduce( (a, b) => Number(a) + Number(b) ) : 0 ;
}