<template>
  <nav class="navbar">
    <div class="topnav">
      <ul class="social-container">
        <li><a href="https://www.facebook.com/" class="social-link" target="_blank"><ion-icon name="logo-facebook"></ion-icon></a></li>
        <li><a href="https://x.com/" class="social-link" target="_blank"><ion-icon name="logo-twitter"></ion-icon></a></li>
        <li><a href="https://www.instagram.com/" class="social-link" target="_blank"><ion-icon name="logo-instagram"></ion-icon></a></li>
      </ul>
      <ul class="account-container">
        <template v-if="!isAuthenticated">
          <li><NuxtLink to="/login" class="login-link">Login | Register</NuxtLink></li>
          <li><NuxtLink to="/account" class="account-link"><ion-icon name="person-circle-outline" class="login-icon"></ion-icon></NuxtLink></li>
        </template>
        <template v-else>
          <li><NuxtLink to="/account" class="login-link">My Profile</NuxtLink></li>
          <li><a href="#" @click.prevent="handleLogout" class="account-link" style="color: #ff4d4d; font-size: 0.9rem;">Logout</a></li>
        </template>
      </ul>
    </div>
    
    <div class="midnav">
      <div class="logo-img">
        <NuxtLink to="/" class="page-link">
          <img src="/public/image/logo.gif" alt="SALTY Logo">
        </NuxtLink>
      </div>
      
      <div class="search-controls-wrapper">
        <form class="container-input" @submit.prevent="handleSearch">
          <input type="text" v-model="searchQuery" placeholder="Search..." class="input-search" required>
          <button type="submit" class="search-button" aria-label="Search">
            <svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
            </svg>
          </button>
        </form>
        
        <div class="cart-icon-wrapper">
          <a href="#" @click.prevent="$router.push('/cart')" class="account-link">
            <ion-icon name="cart-outline" class="cart-icon" style="pointer-events: none;"></ion-icon>
          </a>
          
          <ClientOnly>
            <span id="cart-item-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
          </ClientOnly>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

// Integrations
const { cartItemCount } = useCart()
const { isAuthenticated, logout } = useAuth()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>