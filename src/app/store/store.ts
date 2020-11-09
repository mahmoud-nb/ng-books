import { Action, ActionReducerMap } from "@ngrx/store";
import { cartReducer, CartStore } from './reducers/cart.reducer';

export interface CustomAction {
    type: string,
    payload?: any
}

export interface StoreInterface {
    cartStore: CartStore
}

export const redusers: ActionReducerMap<StoreInterface> = { cartStore: cartReducer };