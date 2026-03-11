<template>
  <div style="margin-top: 2rem; min-height: 60vh;">
    <div class="navigation-header" style="margin-bottom: 20px;">
      <div class="breadcrumb">
        <NuxtLink to="/">Home</NuxtLink> / 
        <span class="current">Search Results</span>
      </div>
    </div>

    <h2 style="margin-bottom: 30px;">
      <span v-if="searchQuery">Search results for: "<span style="color: var(--primary-color);">{{ searchQuery }}</span>"</span>
      <span v-else-if="categoryQuery">
        Category: <span style="text-transform: capitalize; color: var(--primary-color);">{{ categoryQuery }}</span>
      </span>
      <span v-else>All Products</span>
    </h2>

    <!-- Loading state -->
    <div v-if="pending" style="text-align: center; padding: 60px 0;">
      <p style="color: var(--text-muted); font-size: 1.1rem;">กำลังโหลดสินค้า...</p>
    </div>

    <div v-else-if="filteredProducts.length > 0" class="all-items-grid">
      <ProductCard 
        v-for="item in filteredProducts" 
        :key="item.id" 
        :product="item" 
      />
    </div>

    <div v-else style="text-align: center; padding: 60px 0;">
      <ion-icon name="search-outline" style="font-size: 5rem; color: #ccc;"></ion-icon>
      <h3 style="margin-top: 15px;">No products found</h3>
      <p style="color: var(--text-light); margin-bottom: 20px;">
        We couldn't find anything matching your criteria. Try adjusting your keywords.
      </p>
      <NuxtLink to="/" class="cta-button">
        Return to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Use useAsyncData to fetch before the component renders on every page visit
// This works on both direct navigation and client-side routing
const { data: allProducts, pending } = await useAsyncData(
  'products', 
  () => $fetch('https://fakestoreapi.com/products'),
  { 
    default: () => [],
    // cache: true ensures data is not re-fetched if already in state
    dedupe: 'defer'
  }
)

// read URL (?q=... หรือ ?category=...)
const searchQuery = computed(() => route.query.q || '')
const categoryQuery = computed(() => route.query.category || '')

// filter products
const filteredProducts = computed(() => {
  let result = allProducts.value || []

  if (searchQuery.value) {
    const keyword = String(searchQuery.value).toLowerCase()
    result = result.filter(p => 
      p.title.toLowerCase().includes(keyword) || 
      p.description.toLowerCase().includes(keyword)
    )
  }

  if (categoryQuery.value) {
    const cat = String(categoryQuery.value).toLowerCase()
    if (cat !== 'allitems') {
      // Use exact match so "women's clothing" doesn't also match "men's clothing"
      result = result.filter(p => p.category && p.category.toLowerCase() === cat)
    }
  }

  return result
})
</script>