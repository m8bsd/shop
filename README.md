# Vue Shop

A simple e-commerce front end built with **Vue 3**, **Vite**, **Pinia**, **Vue Router** and **Bootstrap 5**.

## Features

- Product catalog with search, category filter and sorting
- Product detail page with quantity picker
- Cart (add, change quantity, remove, clear) persisted in `localStorage`
- Shipping calculation (free over $100) and order summary
- Checkout form with Bootstrap validation and a confirmation screen

## Run it

```bash
npm install
npm run dev      # development server
npm run build    # production build in dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  data/products.js      product list (replace with an API call)
  store/cart.js         Pinia cart store
  components/           NavBar, ProductCard, StarRating
  views/                Home, Product, Cart, Checkout
  router.js             routes (hash mode, works on any static host)
```

## Next steps

Checkout is a demo: it clears the cart and shows a confirmation, nothing is sent anywhere.
To go live, load products from a backend and replace `placeOrder` in
`src/views/CheckoutView.vue` with a call to your orders/payment API.
