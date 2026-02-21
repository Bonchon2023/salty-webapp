<template>
  <div class="card">
    <NuxtLink :to="`/product/${product.id}`">
      <img :src="product.imageUrl" :alt="product.name">
      <div class="card-content">
        <h3>{{ product.name }}</h3>
        <div class="card-rating">
          <ion-icon name="star" style="color: var(--star-color);"></ion-icon> {{ product.rating }}
        </div>
        <div class="price">฿{{ product.price.toLocaleString('en-US') }}</div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
// รับข้อมูลสินค้าที่ถูกโยนเข้ามาจากหน้าหลัก
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>