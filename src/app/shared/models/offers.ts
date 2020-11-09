export interface OFFER { 
    type: string
    sliceValue: Number
    value: Number
}

export interface COMMERCIAL_OFFERS {
    offers : Array<OFFER>
}

export interface CART_OFFER {
    offer: OFFER,
    offerDisplayName: String,
    discounte: Number
}