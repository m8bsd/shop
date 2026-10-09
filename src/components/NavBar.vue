<script setup>
import { useCartStore } from '../store/cart'

const cart = useCartStore()
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="bi bi-bag-heart-fill me-2"></i>Vue Shop
      </router-link>

      <div class="ms-auto d-flex align-items-center gap-2">
        <router-link class="btn btn-outline-light btn-sm" to="/">
          <i class="bi bi-grid me-1"></i>Shop
        </router-link>
        <router-link class="btn btn-warning btn-sm position-relative" to="/cart">
          <i class="bi bi-cart3 me-1"></i>Cart
          <span
            v-if="cart.count"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ cart.count }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>
