<template>
  <NuxtLink
    :to="`/product/${product.id}`"
    class="card reveal-on-scroll"
    :aria-label="`View details for ${product.title}`"
    tabindex="0"
  >
    <div class="card-image-wrapper">
      <img :src="product.image" :alt="product.title" loading="lazy" />
      <div class="card-hover-overlay" aria-hidden="true">
        <ion-icon name="eye-outline"></ion-icon>
        <span>View Details</span>
      </div>
    </div>

    <div class="card-content">
      <h3 :title="product.title">{{ product.title }}</h3>
      <div class="card-rating" :aria-label="`Rating: ${product.rating?.rate || '4.5'} out of 5 stars`">
        <ion-icon name="star" style="color: var(--star-color);" aria-hidden="true"></ion-icon>
        {{ product.rating?.rate || '4.5' }}
        <span style="color: var(--text-muted); font-size: 0.8rem;">({{ product.rating?.count || 0 }})</span>
      </div>
      <p class="price" :aria-label="`Price: $${product.price}`">${{ product.price }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
