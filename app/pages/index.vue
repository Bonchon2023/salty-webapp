<template>
  <div class="home-page">
    
    <!-- 1. HERO PROMOTION CAROUSEL -->
    <section class="hero-section" aria-label="Special Promotions">
      <div class="carousel-container relative-container" id="promo-carousel">
        <div class="carousel-wrapper" style="overflow: hidden;">
          <div 
            class="carousel-track" 
            id="promo-track"
            :style="{ transform: `translateX(-${currentPromo * 100}%)`, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex' }"
          >
            <div class="carousel-item promo-item" style="min-width: 100%;" v-for="(img, index) in promoImages" :key="index">
              <img :src="img" :alt="`Promotion ${index + 1}`" style="width: 100%; display: block;" loading="eager">
            </div>
          </div>
        </div>
        <button class="slider-btn prev-btn" @click="prevPromo" aria-label="Previous Promotion" tabindex="0">
          ❮
        </button>
        <button class="slider-btn next-btn" @click="nextPromo" aria-label="Next Promotion" tabindex="0">
          ❯
        </button>
        
        <div class="dots-container" role="tablist">
          <button 
            v-for="(_, index) in promoImages" 
            :key="index" 
            class="dot" 
            :class="{ active: currentPromo === index }"
            @click="currentPromo = index"
            :aria-label="`Go to slide ${index + 1}`"
            role="tab"
            :aria-selected="currentPromo === index"
            tabindex="0"
          ></button>
        </div>
      </div>
    </section>

    <!-- LOADING / ERROR -->
    <div v-if="isLoading" class="state-message" aria-live="polite">กำลังโหลดข้อมูลสินค้า... (Loading products)</div>
    <div v-else-if="error" class="state-message error" aria-live="assertive">ขออภัย เกิดข้อผิดพลาดในการดึงข้อมูล (Error fetching products)</div>

    <!-- MAIN CONTENT -->
    <div v-else>
      <!-- 2. BEST SELLERS -->
      <section class="carousel-container section-margin relative-container reveal-on-scroll" aria-labelledby="best-sellers-heading">
        <h2 id="best-sellers-heading">Best Sellers</h2>
        
        <button class="slider-btn prev-btn best-seller-btn" @click="scrollBestSeller('left')" aria-label="Scroll Best Sellers Left" tabindex="0">
          ❮
        </button>
        <button class="slider-btn next-btn best-seller-btn" @click="scrollBestSeller('right')" aria-label="Scroll Best Sellers Right" tabindex="0">
          ❯
        </button>

        <div class="best-seller-track" ref="bestSellerTrack" role="region" aria-label="Best Sellers List" tabindex="0">
          <div class="best-seller-item" v-for="item in bestSellers" :key="item.id">
            <ProductCard :product="item" />
          </div>
        </div>
      </section>

      <!-- 3. CATEGORIES -->
      <section class="category-container reveal-on-scroll" aria-labelledby="categories-heading">
        <h2 id="categories-heading">Shop by Category</h2>
        <div class="category-grid">
          <NuxtLink to="/search?category=electronics" class="category-card reveal-on-scroll" aria-label="Shop Electronics">
            <ion-icon name="phone-portrait-outline" class="category-icon" aria-hidden="true"></ion-icon>
            <h3>Electronics</h3>
          </NuxtLink>
          <NuxtLink to="/search?category=jewelery" class="category-card reveal-on-scroll" aria-label="Shop Jewelery">
            <ion-icon name="diamond-outline" class="category-icon" aria-hidden="true"></ion-icon>
            <h3>Jewelery</h3>
          </NuxtLink>
          <NuxtLink to="/search?category=men's clothing" class="category-card reveal-on-scroll" aria-label="Shop Men's Clothing">
            <ion-icon name="man-outline" class="category-icon" aria-hidden="true"></ion-icon>
            <h3>Men's Clothing</h3>
          </NuxtLink>
          <NuxtLink to="/search?category=women's clothing" class="category-card reveal-on-scroll" aria-label="Shop Women's Clothing">
            <ion-icon name="woman-outline" class="category-icon" aria-hidden="true"></ion-icon>
            <h3>Women's Clothing</h3>
          </NuxtLink>
        </div>
      </section>

      <!-- 4. RECOMMENDED -->
      <section class="all-items-container reveal-on-scroll section-margin" aria-labelledby="recommended-heading">
        <h2 id="recommended-heading">Recommended Products</h2>
        <div class="all-items-grid">
          <ProductCard 
            v-for="item in recommendedProducts" 
            :key="item.id" 
            :product="item" 
          />
        </div>
      </section>

      <div class="allitems-card reveal-on-scroll">
        <NuxtLink to="/search?category=allitems" class="allitem-card center-link" aria-label="View All Items">
          <h3>View All Items</h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

const { products, isLoading, error, fetchProducts } = useProducts()

// Use computed safely so when products arrive from API, this updates.
const bestSellers = computed(() => {
  return products.value.filter(p => p.rating && p.rating.rate >= 4.5)
})

const recommendedProducts = computed(() => {
  return products.value.slice(0, 8)
})

// คอยเรียก API ทันทีที่โหลดหน้านี้
onMounted(async () => {
  await fetchProducts()
  await nextTick()
  useScrollReveal() // Initialize scroll animations after DOM updates
})

// ==========================================
// 1. Promotion Carousel
// ==========================================
const currentPromo = ref(0)
const promoImages = [
  '/image/promotion/promotion_1.webp',
  '/image/promotion/promotion_2.webp',
  '/image/promotion/promotion_3.webp',
]
let autoSlideInterval

const nextPromo = () => {
  currentPromo.value = (currentPromo.value + 1) % promoImages.length
}

const prevPromo = () => {
  currentPromo.value = (currentPromo.value - 1 + promoImages.length) % promoImages.length
}

onMounted(() => {
  autoSlideInterval = setInterval(nextPromo, 5000) 
})

onUnmounted(() => {
  clearInterval(autoSlideInterval)
})

// ==========================================
// 2. Best Sellers Carousel (Scroll)
// ==========================================
const bestSellerTrack = ref(null)

const scrollBestSeller = (direction) => {
  if (bestSellerTrack.value) {
    const scrollAmount = direction === 'left' ? -350 : 350
    bestSellerTrack.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}
</script>
