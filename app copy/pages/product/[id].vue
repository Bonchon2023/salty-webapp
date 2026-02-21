<template>
  <div v-if="product">
    <div class="navigation-header">
      <button class="back-btn" @click="goBack">
        <ion-icon name="arrow-back-outline"></ion-icon> Back
      </button>
      <div class="breadcrumb">
        <NuxtLink to="/">Home</NuxtLink> / 
        <NuxtLink :to="`/search?category=${product.category[0]}`" style="text-transform: capitalize;">
          {{ product.category[0] }}
        </NuxtLink> / 
        <span class="current">{{ product.name }}</span>
      </div>
    </div>

    <div class="product-detail-layout">
      <div class="product-image-container">
        <img :src="product.imageUrl" :alt="product.name">
      </div>

      <div class="product-info-container">
        <h1>{{ product.name }}</h1>
        <div class="card-rating" style="font-size: 1.2rem; margin-bottom: 10px;">
          {{ product.rating }}
        </div>
        
        <h2 style="color: var(--primary-color); font-size: 2rem; margin: 20px 0;">
          ฿{{ product.price.toLocaleString('en-US') }}
        </h2>

        <p class="product-description">{{ product.desc }}</p>

        <button class="cta-button" @click="handleAddToCart">
          <ion-icon name="cart-outline"></ion-icon> 
          Add to Cart
        </button>
      </div>
    </div>
  </div>

  <div v-else style="text-align: center; padding: 100px 0;">
    <h2>Product Not Found</h2>
    <p>Not Found Product</p>
    <NuxtLink to="/" class="cta-button" style="margin-top: 20px;">
      Return to Home
    </NuxtLink>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { getProductById } = useProducts()
const { addToCart } = useCart() // ดึงฟังก์ชันเพิ่มลงตะกร้ามาใช้งาน

const product = getProductById(route.params.id)

const goBack = () => {
  router.back()
}

// เมื่อกดปุ่ม Add to Cart
const handleAddToCart = () => {
  if (product) {
    addToCart(product)
  }
}
</script>