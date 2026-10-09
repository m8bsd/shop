<script setup>
import { ref, computed } from 'vue'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const search = ref('')
const category = ref('All')
const sort = ref('featured')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  let list = products.filter(
    (p) =>
      (category.value === 'All' || p.category === category.value) &&
      (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
  )
  if (sort.value === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
  else if (sort.value === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
  else if (sort.value === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
  return list
})
</script>

<template>
  <section class="p-4 p-md-5 mb-4 text-bg-dark rounded-3">
    <h1 class="display-5 fw-bold">Welcome to Vue Shop</h1>
    <p class="lead mb-0">Quality products, simple checkout. Free shipping on orders over $100.</p>
  </section>

  <div class="row g-2 mb-4">
    <div class="col-12 col-md-5">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input
          v-model="search"
          type="search"
          class="form-control"
          placeholder="Search products..."
          aria-label="Search products"
        />
      </div>
    </div>
    <div class="col-6 col-md-4">
      <select v-model="category" class="form-select" aria-label="Filter by category">
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>
    <div class="col-6 col-md-3">
      <select v-model="sort" class="form-select" aria-label="Sort products">
        <option value="featured">Featured</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="rating">Top rated</option>
      </select>
    </div>
  </div>

  <div v-if="filtered.length" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
    <div v-for="p in filtered" :key="p.id" class="col">
      <ProductCard :product="p" />
    </div>
  </div>

  <div v-else class="text-center text-muted py-5">
    <i class="bi bi-emoji-frown fs-1"></i>
    <p class="mt-2">No products match your search.</p>
  </div>
</template>
