<template>
  <div class="account-page-container" style="margin-top: 3rem; min-height: 60vh;">
    
    <div class="navigation-header" style="margin-bottom: 20px;">
      <div class="breadcrumb">
        <NuxtLink to="/">Home</NuxtLink> / 
        <span class="current">My Account</span>
      </div>
    </div>

    <div class="checkout-layout">
      <div class="checkout-left">
        <div class="shipping-form">
          <h2 style="margin-bottom: 20px;">Login</h2>
          <form @submit.prevent="handleLogin">
            <div style="margin-bottom: 15px;">
              <label>Email Address</label>
              <input type="email" v-model="loginForm.email" placeholder="Enter your email" required>
            </div>
            <div style="margin-bottom: 20px;">
              <label>Password</label>
              <input type="password" v-model="loginForm.password" placeholder="Enter your password" required>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <label style="display: flex; align-items: center; gap: 5px; cursor: pointer; font-weight: normal;">
                <input type="checkbox" style="width: auto;"> Remember me
              </label>
              <a href="#" style="color: var(--primary-color); font-size: 0.9rem;">Forgot Password?</a>
            </div>
            <button type="submit" class="cta-button" style="width: 100%; justify-content: center;" :disabled="isLoggingIn">
              <ion-icon name="log-in-outline" v-if="!isLoggingIn"></ion-icon>
              {{ isLoggingIn ? 'Logging in...' : 'Login' }}
            </button>
          </form>
        </div>
      </div>

      <div class="order-summary">
        <h2 style="margin-bottom: 20px;">Register</h2>
        <form @submit.prevent="handleRegister">
          <div style="margin-bottom: 15px;">
            <label>Full Name</label>
            <input type="text" v-model="registerForm.name" placeholder="John Doe" required>
          </div>
          <div style="margin-bottom: 15px;">
            <label>Email Address</label>
            <input type="email" v-model="registerForm.email" placeholder="Enter your email" required>
          </div>
          <div style="margin-bottom: 15px;">
            <label>Password</label>
            <input type="password" v-model="registerForm.password" placeholder="Create a password" required>
          </div>
          <div style="margin-bottom: 20px;">
            <label>Confirm Password</label>
            <input type="password" v-model="registerForm.confirmPassword" placeholder="Confirm your password" required>
          </div>
          <button type="submit" class="cta-button" style="width: 100%; justify-content: center; background-color: #333;" :disabled="isRegistering">
            <ion-icon name="person-add-outline" v-if="!isRegistering"></ion-icon>
            {{ isRegistering ? 'Registering...' : 'Create Account' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ตัวแปรเก็บข้อมูลฟอร์ม
const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ name: '', email: '', password: '', confirmPassword: '' })

// สถานะปุ่มกด
const isLoggingIn = ref(false)
const isRegistering = ref(false)

// ฟังก์ชันจำลองการ Login
const handleLogin = () => {
  isLoggingIn.value = true
  setTimeout(() => {
    isLoggingIn.value = false
    alert(`Welcome back, ${loginForm.value.email}!`)
    router.push('/') // กลับไปหน้าแรก
  }, 1000)
}

// ฟังก์ชันจำลองการ Register
const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert("Passwords do not match!")
    return
  }
  
  isRegistering.value = true
  setTimeout(() => {
    isRegistering.value = false
    alert(`Account created successfully for ${registerForm.value.name}!`)
    router.push('/') // กลับไปหน้าแรก
  }, 1000)
}
</script>