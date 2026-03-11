<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useHead } from '#imports'
import { onMounted } from 'vue'

// Load Ionicons
useHead({
  script: [
    { 
      type: 'module', 
      src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js' 
    },
    { 
      nomodule: true, 
      src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js' 
    }
  ]
})

// Pre-fetch all products globally once when the app starts.
// Because useProducts uses useState, this data is shared across all pages.
const { fetchProducts } = useProducts()
onMounted(async () => {
  await fetchProducts()
})
</script>