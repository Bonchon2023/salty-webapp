<template>
  <div class="cart-container">
    <h2 style="margin-top: 2rem;">Shopping Cart</h2>

    <ClientOnly>
      <div v-if="cartItems.length > 0">
        <div class="cart-items-list">
          <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <img :src="item.imageUrl" :alt="item.name" class="cart-item-image">
            
            <div class="cart-item-info">
              <h3>{{ item.name }}</h3>
              <p>฿{{ (item.price || 0).toLocaleString('en-US') }} / Pice</p>
            </div>

            <div class="cart-item-controls">
              <button class="quantity-btn" @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
              <span style="font-weight: 600;">{{ item.quantity }}</span>
              <button class="quantity-btn" @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>

            <div class="cart-item-total-price">
              ฿{{ ((item.price || 0) * (item.quantity || 1)).toLocaleString('en-US') }}
            </div>

            <button class="remove-btn" @click.prevent="removeFromCart(item.id)" title="Remove item">
              <ion-icon name="trash-outline" style="pointer-events: none;"></ion-icon>
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Total: <span style="color: var(--primary-color);">฿{{ (cartTotalPrice || 0).toLocaleString('en-US') }}</span></h3>
          <NuxtLink to="/checkout" class="cta-button" style="margin-top: 20px;">
            Proceed to Checkout
          </NuxtLink>
        </div>
      </div>

      <div v-else style="text-align: center; padding: 50px 0;">
        <h2>Your cart is empty</h2>
        <NuxtLink to="/" class="cta-button" style="margin-top: 20px;">
          Continue Shopping
        </NuxtLink>
      </div>
      
      <template #fallback>
        <div style="text-align: center; padding: 50px 0;">
          <p>Loading cart...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const { cartItems, removeFromCart, updateQuantity, cartTotalPrice } = useCart()
</script>