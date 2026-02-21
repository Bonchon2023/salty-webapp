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

    <div v-if="filteredProducts.length > 0" class="all-items-grid">
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

// ดึงตัวแปร products ทั้งหมดมาจาก Composable
const { products } = useProducts()

// 1. อ่านค่าจาก URL (?q=... หรือ ?category=...)
const searchQuery = computed(() => route.query.q || '')
const categoryQuery = computed(() => route.query.category || '')

// 2. ฟังก์ชันกรองข้อมูลสินค้า (ทำงานอัตโนมัติเมื่อ URL หรือข้อมูลเปลี่ยน)
const filteredProducts = computed(() => {
  let result = products.value

  // ถ้ามีการพิมพ์คำค้นหาในช่อง Search
  if (searchQuery.value) {
    const keyword = searchQuery.value.toLowerCase()
    // ค้นหาจากชื่อสินค้า หรือ รายละเอียดสินค้า
    result = result.filter(p => 
      p.name.toLowerCase().includes(keyword) || 
      p.desc.toLowerCase().includes(keyword)
    )
  }

  // ถ้ามีการกดปุ่มเลือก Category
  if (categoryQuery.value) {
    const cat = categoryQuery.value.toLowerCase()
    if (cat !== 'allitems') { // ถ้าเป็น allitems ไม่ต้องกรอง ปล่อยผ่านหมด
      result = result.filter(p => p.category && p.category.includes(cat))
    }
  }

  return result
})
</script>