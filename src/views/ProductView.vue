<script setup>
import { ref, computed } from 'vue'
import { getProduct } from '../data/products'
import { useCartStore } from '../store/cart'
import StarRating from '../components/StarRating.vue'

const props = defineProps({ id: { type: String, required: true } })

const cart = useCartStore()
const product = computed(() => getProduct(props.id))
const qty = ref(1)
const added = ref(false)

function addToCart() {
  cart.add(product.value, Math.max(1, Math.min(99, Number(qty.value) || 1)))
  added.value = true
  setTimeout(() => (added.value = false), 1500)
}
</script>

<template>
  <div v-if="product">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Shop</router-link></li>
        <li class="breadcrumb-item">{{ product.category }}</li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
      </ol>
    </nav>

    <div class="row g-4">
      <div class="col-md-6">
        <img :src="product.image" :alt="product.name" class="product-detail-img rounded shadow-sm" />
      </div>
      <div class="col-md-6">
        <span class="badge text-bg-secondary mb-2">{{ product.category }}</span>
        <h1 class="h2">{{ product.name }}</h1>
        <StarRating :rating="product.rating" class="mb-3 d-block" />
        <p class="fs-3 fw-bold">${{ product.price.toFixed(2) }}</p>
        <p class="text-muted">{{ product.description }}</p>

        <div class="d-flex align-items-center gap-3 mt-4">
          <input
            v-model.number="qty"
            type="number"
            min="1"
            max="99"
            class="form-control qty-input"
            aria-label="Quantity"
          />
          <button class="btn btn-lg" :class="added ? 'btn-success' : 'btn-primary'" @click="addToCart">
            <i class="bi me-2" :class="added ? 'bi-check2' : 'bi-cart-plus'"></i>
            {{ added ? 'Added to cart' : 'Add to cart' }}
          </button>
        </div>

        <ul class="list-unstyled text-muted small mt-4">
          <li><i class="bi bi-truck me-2"></i>Free shipping on orders over $100</li>
          <li><i class="bi bi-arrow-repeat me-2"></i>30-day returns</li>
        </ul>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <h2>Product not found</h2>
    <router-link to="/" class="btn btn-primary mt-3">Back to shop</router-link>
  </div>
</template>
