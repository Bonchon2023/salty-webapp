<template>
  <div v-if="product">
    <div class="navigation-header">
      <button class="back-btn" @click="goBack">
        <ion-icon name="arrow-back-outline"></ion-icon> Back
      </button>
      <div class="breadcrumb">
        <NuxtLink to="/">Home</NuxtLink> / 
        <NuxtLink :to="`/search?category=${product.category}`" style="text-transform: capitalize;">
          {{ product.category }}
        </NuxtLink> / 
        <span class="current">{{ product.title }}</span>
      </div>
    </div>

    <div class="product-detail-layout">
      <div class="product-image-container">
        <img :src="product.image" :alt="product.title">
      </div>

      <div class="product-info-container">
        <h1>{{ product.title }}</h1>
        <div class="card-rating" style="font-size: 1.2rem; margin-bottom: 10px;">
          ★ {{ product.rating?.rate }} ({{ product.rating?.count }} reviews)
        </div>
        
        <h2 style="color: var(--primary-color); font-size: 2rem; margin: 20px 0;">
          ${{ product.price }}
        </h2>

        <p class="product-description">{{ product.description }}</p>

        <button class="cta-button" @click="handleAddToCart">
          <ion-icon name="cart-outline"></ion-icon> 
          Add to Cart
        </button>
      </div>
    </div>
  </div>

  <div v-else style="text-align: center; padding: 100px 0;">
    <h2>Product Not Found</h2>
    <p>Loading or Product Not Found...</p>
    <NuxtLink to="/" class="cta-button" style="margin-top: 20px;">
      Return to Home
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { fetchProductById, getProductById } = useProducts()
const { addToCart } = useCart()

const product = ref(null)

onMounted(async () => {
  const id = route.params.id
  let existingProduct = getProductById(id)
  
  if (existingProduct) {
    product.value = existingProduct
  } else {
    product.value = await fetchProductById(id)
  }
})

const goBack = () => {
  router.back()
}

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value)
  }
}
</script>