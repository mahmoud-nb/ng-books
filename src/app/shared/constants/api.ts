const API = {
    BASE_URL : "http://henri-potier.xebia.fr",
    BOOKS: "/books",
    OFFERS: (params) => `/books/${params}/commercialOffers`
};

export default API;