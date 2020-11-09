import { Book } from 'src/app/shared/models/book';

export const ADD_BOOK = '[CART] Add book';
export const REMOVE_BOOK = '[CART] Remove book';
export const CLEAR_CART = '[CART] CLEAR';

export class AddBookAction {
    type: string = ADD_BOOK
    payload: Book

    constructor(payload: Book){
        this.payload = payload;
    }
}

export class RemoveBookAction {
    type: string = REMOVE_BOOK
    payload: Book

    constructor(payload: Book){
        this.payload = payload;
    }
}

export class ClearCartAction {
    type: string = CLEAR_CART
}