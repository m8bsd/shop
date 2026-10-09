import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-shop-cart'

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: load(), // [{ id, name, price, image, qty }]
  }),

  getters: {
    count: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
    shipping() {
      return this.items.length === 0 || this.subtotal >= 100 ? 0 : 7.5
    },
    total() {
      return this.subtotal + this.shipping
    },
  },

  actions: {
    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      } catch {
        /* storage unavailable – cart still works for this session */
      }
    },

    add(product, qty = 1) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.qty += qty
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        })
      }
      this.persist()
    },

    setQty(id, qty) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return
      item.qty = Math.max(1, Math.min(99, Number(qty) || 1))
      this.persist()
    },

    remove(id) {
      this.items = this.items.filter((i) => i.id !== id)
      this.persist()
    },

    clear() {
      this.items = []
      this.persist()
    },
  },
})
