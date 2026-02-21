<template>
  <div>
    <div class="carousel-container relative-container" id="promo-carousel">
      <div class="carousel-wrapper" style="overflow: hidden;">
        <div 
          class="carousel-track" 
          id="promo-track"
          :style="{ transform: `translateX(-${currentPromo * 100}%)`, transition: 'transform 0.5s ease-in-out', display: 'flex' }"
        >
          <div class="carousel-item promo-item" style="min-width: 100%;" v-for="(img, index) in promoImages" :key="index">
            <img :src="img" :alt="`Promotion ${index + 1}`" style="width: 100%; display: block;">
          </div>
        </div>
      </div>
      <button class="slider-btn prev-btn" @click="prevPromo" aria-label="Previous">❮</button>
      <button class="slider-btn next-btn" @click="nextPromo" aria-label="Next">❯</button>
      
      <div class="dots-container">
        <span 
          v-for="(_, index) in promoImages" 
          :key="index" 
          class="dot" 
          :class="{ active: currentPromo === index }"
          @click="currentPromo = index"
        ></span>
      </div>
    </div>

    <div class="carousel-container section-margin relative-container">
      <h2>Best Sellers</h2>
      
      <button class="slider-btn prev-btn best-seller-btn" @click="scrollBestSeller('left')">❮</button>
      <button class="slider-btn next-btn best-seller-btn" @click="scrollBestSeller('right')">❯</button>

      <div class="best-seller-track" ref="bestSellerTrack">
        <div class="best-seller-item" v-for="item in bestSellers" :key="item.id">
          <ProductCard :product="item" />
        </div>
      </div>
    </div>

    <section class="category-container">
      <h2>Category</h2>
      <div class="category-grid">
        <NuxtLink to="/search?category=smartphone" class="category-card">
          <ion-icon name="phone-portrait-outline" class="category-icon"></ion-icon>
          <h3>Smartphone & Tablet</h3>
        </NuxtLink>
        <NuxtLink to="/search?category=it-gadget" class="category-card">
          <ion-icon name="tv-outline" class="category-icon"></ion-icon>
          <h3>IT Gadget</h3>
        </NuxtLink>
        <NuxtLink to="/search?category=smartwatch" class="category-card">
          <ion-icon name="watch-outline" class="category-icon"></ion-icon>
          <h3>Smartwatch</h3>
        </NuxtLink>
        <NuxtLink to="/search?category=sport" class="category-card">
          <ion-icon name="football-outline" class="category-icon"></ion-icon>
          <h3>Sport</h3>
        </NuxtLink>
        <NuxtLink to="/search?category=accessories" class="category-card">
          <ion-icon name="pricetag-outline" class="category-icon"></ion-icon>
          <h3>Accessories</h3>
        </NuxtLink>
        <NuxtLink to="/search?category=clothing" class="category-card">
          <ion-icon name="shirt-outline" class="category-icon"></ion-icon>
          <h3>Clothing</h3>
        </NuxtLink>
      </div>
    </section>

    <section class="all-items-container">
      <h2>Recommended Products</h2>
      <div class="all-items-grid">
        <ProductCard 
          v-for="item in recommendedProducts" 
          :key="item.id" 
          :product="item" 
        />
      </div>
    </section>

    <div class="allitems-card">
      <NuxtLink to="/search?category=allitems" class="allitem-card center-link">
        <h3>All Items</h3>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { getBestSellers, getRecommended } = useProducts()
const bestSellers = getBestSellers()
const recommendedProducts = getRecommended()

// ==========================================
// 1. ระบบ Promotion Carousel
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

// เริ่มต้น Auto-slide เมื่อโหลดหน้าเว็บเสร็จ
onMounted(() => {
  autoSlideInterval = setInterval(nextPromo, 4000) // เลื่อนทุกๆ 4 วินาที
})

// ลบ Interval ทิ้งเมื่อเปลี่ยนหน้า ป้องกันบั๊ก
onUnmounted(() => {
  clearInterval(autoSlideInterval)
})

// ==========================================
// 2. ระบบ Best Sellers Carousel (Scroll)
// ==========================================
const bestSellerTrack = ref(null)

const scrollBestSeller = (direction) => {
  if (bestSellerTrack.value) {
    // เลื่อนทีละประมาณ 300px (ความกว้างของการ์ด)
    const scrollAmount = direction === 'left' ? -300 : 300
    bestSellerTrack.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.section-margin {
  margin-top: 3rem;
}
.center-link {
  width: 100%;
  text-align: center;
}

/* สไตล์สำหรับ Carousel Container */
.carousel-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.carousel-item img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .carousel-item img {
    height: 250px;
  }
  
  .slider-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .prev-btn { left: 5px; }
  .next-btn { right: 5px; }
}

@media (max-width: 480px) {
  .carousel-item img {
    height: 200px;
  }
  
  .slider-btn {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }
}

/* ตั้งค่าให้คอนเทนเนอร์คุมปุ่มไม่ให้ล้นออกไป */
.relative-container {
  position: relative;
}

/* สไตล์สำหรับปุ่มเลื่อน (ใช้ร่วมกันทั้ง Promo และ Best Seller) */
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  color: var(--primary-color, #E43D12);
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.slider-btn:hover {
  background-color: white;
}

.prev-btn { left: 10px; }
.next-btn { right: 10px; }

/* จุดบอกตำแหน่ง Promotion (Dots) */
.dots-container {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: rgba(255,255,255,0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background-color: var(--primary-color, #E43D12);
  transform: scale(1.2);
}

/* สไตล์สำหรับ Best Seller Track */
.best-seller-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 10px 5px;
  /* ซ่อน Scrollbar ให้ดูสวยงาม */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.best-seller-track::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.best-seller-item {
  min-width: 250px; /* ขนาดขั้นต่ำของการ์ด */
  max-width: 280px;
  flex: 0 0 auto;
  scroll-snap-align: start;
}

/* ปรับตำแหน่งปุ่ม Best Seller ให้ตรงกลางการ์ด */
.best-seller-btn {
  top: 60%;
}
</style>