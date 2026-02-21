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
  // 1. สร้าง Cookie สำหรับจำตะกร้า (ตั้งอายุไว้ 7 วัน)
  const cartCookie = useCookie<CartItem[]>('salty_cart', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 7 // จำไว้ 7 วัน
  })

  // 2. ให้ useState ดึงข้อมูลเริ่มต้นมาจาก Cookie
  const cartItems = useState<CartItem[]>('cart', () => cartCookie.value || [])

  // 3. (สำคัญ🌟) คอยเฝ้าดู (Watch) ถ้ามีการเพิ่ม/ลดสินค้า ให้เซฟลง Cookie อัตโนมัติ!
  watch(cartItems, (newCart) => {
    cartCookie.value = newCart
  }, { deep: true }) // deep: true คือให้ดูทะลุไปถึงจำนวน quantity ข้างในด้วย

  const addToCart = (product: any) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
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
    clearCart // <--- อย่าลืม return ออกมาด้วยนะครับ
  }
 
}