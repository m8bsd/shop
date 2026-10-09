<script setup>
import { computed } from 'vue'

const props = defineProps({ rating: { type: Number, required: true } })

const stars = computed(() =>
  Array.from({ length: 5 }, (_, i) => {
    const n = i + 1
    if (props.rating >= n) return 'bi-star-fill'
    if (props.rating >= n - 0.5) return 'bi-star-half'
    return 'bi-star'
  }),
)
</script>

<template>
  <span class="text-warning" :title="`${rating} / 5`">
    <i v-for="(cls, i) in stars" :key="i" class="bi" :class="cls"></i>
    <span class="text-muted small ms-1">{{ rating.toFixed(1) }}</span>
  </span>
</template>
