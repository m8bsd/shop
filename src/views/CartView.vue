<script setup>
import { useCartStore } from '../store/cart'

const cart = useCartStore()
</script>

<template>
  <h1 class="h3 mb-4">Your cart</h1>

  <div v-if="!cart.items.length" class="text-center py-5">
    <i class="bi bi-cart-x fs-1 text-muted"></i>
    <p class="text-muted mt-2">Your cart is empty.</p>
    <router-link to="/" class="btn btn-primary">Continue shopping</router-link>
  </div>

  <div v-else class="row g-4">
    <div class="col-lg-8">
      <div class="card shadow-sm border-0">
        <ul class="list-group list-group-flush">
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="list-group-item d-flex align-items-center gap-3 flex-wrap"
          >
            <img :src="item.image" :alt="item.name" class="cart-thumb rounded" />
            <div class="flex-grow-1">
              <router-link
                :to="`/product/${item.id}`"
                class="fw-semibold text-decoration-none text-dark"
              >
                {{ item.name }}
              </router-link>
              <div class="text-muted small">${{ item.price.toFixed(2) }} each</div>
            </div>
            <input
              :value="item.qty"
              type="number"
              min="1"
              max="99"
              class="form-control form-control-sm qty-input"
              :aria-label="`Quantity for ${item.name}`"
              @change="cart.setQty(item.id, $event.target.value)"
            />
            <div class="fw-bold text-end" style="min-width: 80px">
              ${{ (item.price * item.qty).toFixed(2) }}
            </div>
            <button
              class="btn btn-sm btn-outline-danger"
              :aria-label="`Remove ${item.name}`"
              @click="cart.remove(item.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </li>
        </ul>
      </div>
      <button class="btn btn-link text-danger mt-2 px-0" @click="cart.clear()">Clear cart</button>
    </div>

    <div class="col-lg-4">
      <div class="card shadow-sm border-0">
        <div class="card-body">
          <h2 class="h5 mb-3">Order summary</h2>
          <div class="d-flex justify-content-between mb-2">
            <span>Subtotal</span><span>${{ cart.subtotal.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <span>{{ cart.shipping ? `$${cart.shipping.toFixed(2)}` : 'Free' }}</span>
          </div>
          <hr />
          <div class="d-flex justify-content-between fw-bold fs-5 mb-3">
            <span>Total</span><span>${{ cart.total.toFixed(2) }}</span>
          </div>
          <router-link to="/checkout" class="btn btn-success w-100">Proceed to checkout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
