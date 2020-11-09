import { Book } from 'src/app/shared/models/book'

import { ADD_BOOK, CLEAR_CART, REMOVE_BOOK } from '../actions/cart.actions';
import { CustomAction } from '../store';

export interface CartStore {
    items : Array<CartItem>
};

export interface CartItem {
    item : Book
    qty: Number
};

let initialCart: CartStore = {
    items : []
};

function addBookToCart(cartItems, newItem){
    const itemIndex = cartItems.findIndex( el => el.item.isbn == newItem.isbn );

    if(itemIndex < 0)
        cartItems = [...cartItems, {item: newItem, qty: 1}]
    else{
        const currentItem = { 
            ...cartItems[itemIndex], 
            qty: cartItems[itemIndex].qty+1 
        };

        let cartItemsColne = [...cartItems];

        cartItemsColne[itemIndex] = {...currentItem} ;

        cartItems = [...cartItemsColne];
    }

    return {
        items: cartItems
    };
}

function removeBookFromCart(cartItems, toRemoveItem){
    return {
        items: cartItems.filter( el => el.item.isbn != toRemoveItem.isbn )
    };
}

// Reducer
export function cartReducer(state: CartStore = initialCart, action: CustomAction){

    switch ( action.type ){
        case ADD_BOOK:
            return addBookToCart(state.items, action.payload);
        case REMOVE_BOOK:
            return removeBookFromCart(state.items, action.payload);
        case CLEAR_CART:
            return initialCart
        default:
            return state
    }
}
