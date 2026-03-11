import { useState, useCookie } from '#app'
import { computed, watch } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export const useCart = () => {
  const { isAuthenticated } = useAuth()
  
  // 1. Local Persistence
  const cartCookie = useCookie<CartItem[]>('salty_cart', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 7 
  })

  // 2. Reactive State
  const cartItems = useState<CartItem[]>('cart', () => cartCookie.value || [])

  // 3. API Synchronization 
  // Whenever the local cart changes, if we are logged in, sync it to the FakeStore API Cart
  watch(cartItems, async (newCart) => {
    cartCookie.value = newCart
    
    // FakeStoreAPI Mock Integration: Update User 1's Cart
    if (isAuthenticated.value) {
      try {
         // Map our local format to the FakeStoreAPI format
         const apiProducts = newCart.map(item => ({
           productId: item.id,
           quantity: item.quantity
         }))

         await $fetch('https://fakestoreapi.com/carts/1', {
           method: 'PUT',
           body: {
             userId: 1, // Default user
             date: new Date().toISOString().split('T')[0],
             products: apiProducts
           }
         })
         // Note: FakeStoreAPI returns 200, but doesn't actually persist the update.
         // However, this simulates a real-world API PUT operation!
      } catch (error) {
         console.error('Failed to sync cart with remote API:', error)
      }
    }
  }, { deep: true }) 

  const addToCart = (product: any) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.title,
        price: product.price,
        imageUrl: product.image,
        quantity: 1
      })
    }
  }

  const removeFromCart = (id: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
  }

  const updateQuantity = (id: number, quantity: number) => {
    const item = cartItems.value.find(item => item.id === id)
    if (item && quantity > 0) {
      item.quantity = quantity
    }
  }

  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartItemCount,
    cartTotalPrice,
    clearCart 
  }
}