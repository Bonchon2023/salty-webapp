<template>
  <div class="auth-page">
    <div class="auth-card">

      <!-- Toggle Pill Switch -->
      <div class="auth-toggle" role="tablist" aria-label="Login or Register">
        <button
          role="tab"
          :aria-selected="activeTab === 'login'"
          :class="['toggle-btn', { active: activeTab === 'login' }]"
          @click="activeTab = 'login'"
        >
          <ion-icon name="log-in-outline"></ion-icon> Login
        </button>
        <button
          role="tab"
          :aria-selected="activeTab === 'register'"
          :class="['toggle-btn', { active: activeTab === 'register' }]"
          @click="activeTab = 'register'"
        >
          <ion-icon name="person-add-outline"></ion-icon> Register
        </button>
      </div>

      <!-- Login Form -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="auth-form" aria-label="Login form">
        <h2>Welcome back</h2>
        <p class="auth-subtitle">Sign in to your account</p>

        <div class="form-group">
          <label for="login-username">Username</label>
          <input
            id="login-username"
            type="text"
            v-model="loginForm.username"
            placeholder="e.g. johnd"
            autocomplete="username"
            required
          />
        </div>

        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label for="login-pass">Password</label>
            <a href="#" class="forgot-link">Forgot Password?</a>
          </div>
          <input
            id="login-pass"
            type="password"
            v-model="loginForm.password"
            placeholder="e.g. m38rmF$"
            autocomplete="current-password"
            required
          />
        </div>

        <p v-if="loginError" class="error-msg" role="alert">{{ loginError }}</p>

        <button type="submit" class="cta-button" :disabled="isLoggingIn">
          <ion-icon name="log-in-outline" v-if="!isLoggingIn"></ion-icon>
          {{ isLoggingIn ? 'Signing in...' : 'Sign In' }}
        </button>

        <p class="auth-switch-text">
          Don't have an account?
          <button type="button" class="link-btn" @click="activeTab = 'register'">Register here</button>
        </p>
      </form>

      <!-- Register Form -->
      <form v-else @submit.prevent="handleRegister" class="auth-form" aria-label="Register form">
        <h2>Create Account</h2>
        <p class="auth-subtitle">Join us today — it's free!</p>

        <div class="form-group">
          <label for="reg-name">Full Name</label>
          <input id="reg-name" type="text" v-model="registerForm.name" placeholder="John Doe" required />
        </div>

        <div class="form-group">
          <label for="reg-username">Username</label>
          <input id="reg-username" type="text" v-model="registerForm.username" placeholder="Choose a username" autocomplete="username" required />
        </div>

        <div class="form-group">
          <label for="reg-email">Email Address</label>
          <input id="reg-email" type="email" v-model="registerForm.email" placeholder="you@example.com" autocomplete="email" required />
        </div>

        <div class="form-group">
          <label for="reg-pass">Password</label>
          <input id="reg-pass" type="password" v-model="registerForm.password" placeholder="Create a strong password" autocomplete="new-password" required />
        </div>

        <p v-if="registerMessage" class="success-msg" role="status">{{ registerMessage }}</p>

        <button type="submit" class="cta-button" :disabled="isRegistering">
          <ion-icon name="person-add-outline" v-if="!isRegistering"></ion-icon>
          {{ isRegistering ? 'Creating Account...' : 'Create Account' }}
        </button>

        <p class="auth-switch-text">
          Already have an account?
          <button type="button" class="link-btn" @click="activeTab = 'login'">Sign in here</button>
        </p>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuth()

const activeTab = ref('login')

const loginForm = ref({ username: '', password: '' })
const registerForm = ref({ name: '', username: '', email: '', password: '' })

const isLoggingIn = ref(false)
const loginError = ref('')
const isRegistering = ref(false)
const registerMessage = ref('')

const handleLogin = async () => {
  isLoggingIn.value = true
  loginError.value = ''
  const success = await login({ username: loginForm.value.username, password: loginForm.value.password })
  if (success) {
    router.push('/')
  } else {
    loginError.value = 'Invalid username or password. Please try again.'
  }
  isLoggingIn.value = false
}

const handleRegister = async () => {
  isRegistering.value = true
  registerMessage.value = ''
  try {
    const response = await $fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: {
        email: registerForm.value.email,
        username: registerForm.value.username,
        password: registerForm.value.password,
        name: { firstname: registerForm.value.name, lastname: '' },
        address: { city: 'mock', street: 'mock', number: 1, zipcode: '0000', geolocation: { lat: '0', long: '0' } },
        phone: '1-1234'
      }
    })
    if (response) {
      registerMessage.value = `Account created! You can now sign in as "${registerForm.value.username}".`
      loginForm.value.username = registerForm.value.username
      loginForm.value.password = registerForm.value.password
      setTimeout(() => { activeTab.value = 'login' }, 2000)
    }
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    isRegistering.value = false
  }
}
</script>
