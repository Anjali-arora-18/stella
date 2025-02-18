import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return { cart: [] }
  },
  actions: {
    addToCart(product) {
      this.cart.push(product)
    },
  },
})
