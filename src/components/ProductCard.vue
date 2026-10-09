<script setup>
import { ref } from 'vue'
import { useCartStore } from '../store/cart'
import StarRating from './StarRating.vue'

const props = defineProps({ product: { type: Object, required: true } })
const cart = useCartStore()
const justAdded = ref(false)

function addToCart() {
  cart.add(props.product)
  justAdded.value = true
  setTimeout(() => (justAdded.value = false), 1200)
}
</script>

<template>
  <div class="card h-100 shadow-sm product-card border-0">
    <router-link :to="`/product/${product.id}`">
      <img
        :src="product.image"
        :alt="product.name"
        class="card-img-top product-img"
        loading="lazy"
      />
    </router-link>
    <div class="card-body d-flex flex-column">
      <span class="badge text-bg-secondary align-self-start mb-2">{{ product.category }}</span>
      <h5 class="card-title">
        <router-link
          :to="`/product/${product.id}`"
          class="text-decoration-none text-dark"
        >
          {{ product.name }}
        </router-link>
      </h5>
      <StarRating :rating="product.rating" class="mb-2" />
      <p class="card-text text-muted small flex-grow-1">{{ product.description }}</p>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <span class="fs-5 fw-bold">${{ product.price.toFixed(2) }}</span>
        <button
          class="btn btn-sm"
          :class="justAdded ? 'btn-success' : 'btn-primary'"
          @click="addToCart"
        >
          <i class="bi me-1" :class="justAdded ? 'bi-check2' : 'bi-cart-plus'"></i>
          {{ justAdded ? 'Added' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>
