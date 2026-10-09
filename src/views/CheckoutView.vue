<script setup>
import { reactive, ref } from 'vue'
import { useCartStore } from '../store/cart'

const cart = useCartStore()

const form = reactive({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  payment: 'cod',
})
const submitted = ref(false)
const orderNumber = ref('')
const orderTotal = ref(0)
const validated = ref(false)

function placeOrder(e) {
  validated.value = true
  if (!e.target.checkValidity()) return

  // Demo only: no real payment or backend. Swap this for an API call.
  orderNumber.value = 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase()
  orderTotal.value = cart.total
  cart.clear()
  submitted.value = true
}
</script>

<template>
  <div v-if="submitted" class="text-center py-5">
    <i class="bi bi-check-circle-fill text-success display-3"></i>
    <h1 class="h3 mt-3">Thank you, {{ form.name }}!</h1>
    <p class="text-muted mb-1">
      Order <strong>{{ orderNumber }}</strong> has been placed (total ${{ orderTotal.toFixed(2) }}).
    </p>
    <p class="text-muted">A confirmation would be sent to {{ form.email }}.</p>
    <router-link to="/" class="btn btn-primary">Continue shopping</router-link>
  </div>

  <div v-else-if="!cart.items.length" class="text-center py-5">
    <p class="text-muted">Your cart is empty.</p>
    <router-link to="/" class="btn btn-primary">Back to shop</router-link>
  </div>

  <div v-else>
    <h1 class="h3 mb-4">Checkout</h1>
    <div class="row g-4">
      <div class="col-lg-7">
        <form
          class="card shadow-sm border-0"
          :class="{ 'was-validated': validated }"
          novalidate
          @submit.prevent="placeOrder"
        >
          <div class="card-body row g-3">
            <div class="col-md-6">
              <label class="form-label" for="name">Full name</label>
              <input id="name" v-model.trim="form.name" class="form-control" required />
              <div class="invalid-feedback">Please enter your name.</div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="email">Email</label>
              <input id="email" v-model.trim="form.email" type="email" class="form-control" required />
              <div class="invalid-feedback">Please enter a valid email.</div>
            </div>
            <div class="col-12">
              <label class="form-label" for="address">Address</label>
              <input id="address" v-model.trim="form.address" class="form-control" required />
              <div class="invalid-feedback">Please enter your address.</div>
            </div>
            <div class="col-md-8">
              <label class="form-label" for="city">City</label>
              <input id="city" v-model.trim="form.city" class="form-control" required />
              <div class="invalid-feedback">Please enter your city.</div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="zip">ZIP / Postal code</label>
              <input id="zip" v-model.trim="form.zip" class="form-control" required />
              <div class="invalid-feedback">Required.</div>
            </div>

            <div class="col-12">
              <label class="form-label d-block">Payment method</label>
              <div class="form-check form-check-inline">
                <input id="cod" v-model="form.payment" class="form-check-input" type="radio" value="cod" />
                <label class="form-check-label" for="cod">Cash on delivery</label>
              </div>
              <div class="form-check form-check-inline">
                <input id="card" v-model="form.payment" class="form-check-input" type="radio" value="card" />
                <label class="form-check-label" for="card">Card (demo)</label>
              </div>
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-success btn-lg w-100">
                Place order &middot; ${{ cart.total.toFixed(2) }}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="col-lg-5">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h2 class="h5 mb-3">Order summary</h2>
            <ul class="list-unstyled mb-3">
              <li v-for="item in cart.items" :key="item.id" class="d-flex justify-content-between small mb-1">
                <span>{{ item.name }} &times; {{ item.qty }}</span>
                <span>${{ (item.price * item.qty).toFixed(2) }}</span>
              </li>
            </ul>
            <hr />
            <div class="d-flex justify-content-between mb-1">
              <span>Subtotal</span><span>${{ cart.subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span>Shipping</span>
              <span>{{ cart.shipping ? `$${cart.shipping.toFixed(2)}` : 'Free' }}</span>
            </div>
            <div class="d-flex justify-content-between fw-bold fs-5 mt-2">
              <span>Total</span><span>${{ cart.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
