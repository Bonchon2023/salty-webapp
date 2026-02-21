<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useHead } from '#imports'

// บังคับโหลด Ionicons ใหม่ให้ชัวร์ที่สุด
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
</script>