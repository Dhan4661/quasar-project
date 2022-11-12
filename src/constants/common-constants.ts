const COMMON_CONSTANTS = {
  HOME_DELIVERY_URL: 'https://shop.servicefoodshome.co.nz/Register',
  SESSION_EXPIRED: 'Your session is expired, please login again!',
  CHANGE_PASSWORD: 'Password changed successfully.',
  DEFAULT_COUNTRY: 'New Zealand',
  NO_ACCOUNTS_FOUND: 'No matching accounts found.',
  NO_DATA_ORDER_HISTORY:
    'There were no matching results in your order history to display.',
  NO_DATA_QUOTE_HISTORY:
    'There were no matching results in your quote history to display.',
  NO_DATA_INVOICE_CREDIT_HISTORY:
    'There were no matching results in your invoices / credits history to display.',
  NO_DATA_PURCHASE_REPORT:
    'No data available for this previous purchases report.',
  NO_DATA_STOCKTAKE_REPORT: 'No data available for this stocktake report.',
  CLEAR_SEARCH_MSG: 'Your results are being limited by your search criteria.',
  DELETE_MSG: 'Are you sure you want to delete:<br/>',
  DEFAULT_DELETE_MSG: 'Are you sure you want to delete this entry?',
  PHONE_NO_HINT: 'Area code followed by number. Eg: 09 123 0000',
  WEEKDAYS: [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ],
  MENU_TYPES: {
    home: 0,
    categories: 1,
    specials: 2,
    myPantry: 3,
    myAccount: 4,
    contact: 5,
    customerCentre: 6,
    logout: 7,
  },
  PRODUCT_FROM_PAGE: {
    checkout: {
      url: 'checkout',
      name: 'Checkout',
    },
    'cart-summary': {
      url: 'cart-summary',
      name: 'My Cart',
    },
    // 'my-account':{
    //   url:'my-account',
    //   name:'My Account',
    // },
    home: {
      url: '/home',
      name: 'Home',
    },
    'product-detail': {
      url: '/home',
      name: 'Home',
    },
    'product-categories': {
      url: '/home',
      name: 'Home',
    },
    'my-pantry-template-detail': {
      url: '/my-pantry',
      name: 'My Pantry',
    },
    'pantry-edit-standing-order': {
      url: '/my-pantry',
      name: 'My Pantry',
    },
    'pantry-create-standing-order': {
      url: '/my-pantry',
      name: 'My Pantry',
    },
    'pantry-edit-template': {
      url: '/my-pantry',
      name: 'My Pantry',
    },
    'pantry-create-template': {
      url: '/my-pantry',
      name: 'My Pantry',
    },
    'my-pantry-edit-favourites': {
      url: '/my-pantry',
      name: 'My Pantry',
    },
    favourites: {
      url: '/favourites',
      name: 'My Pantry',
    },
    'search-products': {
      url: '/search',
      name: 'Search Products',
    },
    'new-products': {
      url: '/new-products',
      name: 'New Products',
    },
    'special-products': {
      url: '/special-products',
      name: 'Monthly Specials',
    },
    notification: {
      url: '/notification',
      name: 'Notification',
    },
    weeklyCheckout: {
      url: 'checkout/weekly',
      name: 'Weekly',
    },
  },
  LOADING_MESSAGE: 'Loading Results...',
  SEARCH_ERROR_MESSAGE:
    'You must enter at least three letters before you can search.',
};

export default COMMON_CONSTANTS;
