<template>
  <div style="margin-top: 2rem; min-height: 60vh;">
    <div class="navigation-header" style="margin-bottom: 20px;">
      <button class="back-btn" @click="$router.back()"> 
        <ion-icon name="arrow-back-outline"></ion-icon> Back
      </button>
      <div class="breadcrumb">
        <NuxtLink to="/">Home</NuxtLink> / 
        <span class="current">My Account</span>
      </div>
    </div>

    <section class="account-layout">
      <aside class="account-sidebar">
        <div class="user-summary">
          <ion-icon name="person-circle-outline" class="user-avatar"></ion-icon>
          <h3>{{ profile.name || 'Loading...' }}</h3>
          <p style="color: #666; font-size: 0.9rem;">{{ profile.email }}</p>
        </div>
        
        <ul class="sidebar-menu">
          <li>
            <a @click.prevent="activeTab = 'profile'" :class="{ active: activeTab === 'profile' }" style="cursor: pointer;">
              <ion-icon name="person-outline"></ion-icon> My Profile
            </a>
          </li>
          <li>
            <a @click.prevent="activeTab = 'orders'" :class="{ active: activeTab === 'orders' }" style="cursor: pointer;">
              <ion-icon name="bag-handle-outline"></ion-icon> Order History
            </a>
          </li>
          <li>
            <a @click.prevent="activeTab = 'address'" :class="{ active: activeTab === 'address' }" style="cursor: pointer;">
              <ion-icon name="location-outline"></ion-icon> Address Book
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="handleLogout" style="color: #ff4d4d;">
              <ion-icon name="log-out-outline"></ion-icon> Logout
            </a>
          </li>
        </ul>
      </aside>

      <div class="account-content">
        
        <div v-show="activeTab === 'profile'" class="tab-content active">
          <h2 class="section-header">Edit Profile</h2>
          
          <div v-if="isLoading">Loading profile...</div>
          
          <form v-else class="shipping-form" style="box-shadow: none; padding: 0;" @submit.prevent="saveProfile">
            <label for="acc-name">Full Name:</label>
            <input type="text" id="acc-name" v-model="profile.name" required>

            <label for="acc-email">Email Address:</label>
            <input type="email" id="acc-email" v-model="profile.email" required>

            <label for="acc-phone">Phone Number:</label>
            <input type="tel" id="acc-phone" v-model="profile.phone" placeholder="08X-XXX-XXXX">

            <div style="margin-top: 20px;">
              <label for="acc-pass">New Password (leave blank to keep current):</label>
              <input type="password" id="acc-pass" v-model="passwordInput" style="width: 100%; padding: 0.8em; border: 1px solid #ccc; border-radius: 6px;">
            </div>

            <button type="submit" class="cta-button" style="margin-top: 20px;" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>
            <p v-if="saveMessage" style="color: green; margin-top: 10px;">{{ saveMessage }}</p>
          </form>
        </div>

        <div v-show="activeTab === 'orders'" class="tab-content active">
          <h2 class="section-header">Recent Orders</h2>
          <div style="overflow-x: auto;">
            <table class="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-250101</td>
                  <td>21 Jan 2025</td>
                  <td><span class="status-badge status-processing">Processing</span></td>
                  <td>฿15,900</td>
                  <td><a href="#" style="color: var(--primary-color);">View</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-show="activeTab === 'address'" class="tab-content active">
          <h2 class="section-header">My Address</h2>
          <div class="card" style="border: 1px solid #eee; padding: 0;">
            <div class="card-content">
              <h3>Default Shipping Address</h3>
              <p style="color: #666; margin-top: 10px; line-height: 1.6;">
                {{ profile.name || 'Not set' }}<br>
                {{ addressDetails.street }}, {{ addressDetails.number }}<br>
                {{ addressDetails.city }}, Zip: {{ addressDetails.zipcode }}<br>
                Tel: {{ profile.phone || 'Not provided' }}
              </p>
              <button class="cta-button" style="margin-top: 15px; font-size: 0.9rem; padding: 8px 16px;">
                Edit Address
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { logout, isAuthenticated } = useAuth()

const activeTab = ref('profile')
const isLoading = ref(true)
const isSaving = ref(false)
const saveMessage = ref('')
const passwordInput = ref('')

// User State (Mapped from FakeStoreAPI)
const profile = ref({
  name: '',
  email: '',
  phone: '',
  username: ''
})

const addressDetails = ref({
  city: '',
  street: '',
  number: '',
  zipcode: ''
})

// Default mapped ID for FakeStore API
const userId = 1

onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  try {
    const data = await $fetch(`https://fakestoreapi.com/users/${userId}`)
    
    if (data) {
      profile.value.name = `${data.name.firstname} ${data.name.lastname}`
      profile.value.email = data.email
      profile.value.phone = data.phone
      profile.value.username = data.username
      
      addressDetails.value = data.address
    }
  } catch (error) {
    console.error('Failed to load user profile:', error)
  } finally {
    isLoading.value = false
  }
})

const saveProfile = async () => {
  isSaving.value = true
  saveMessage.value = ''

  try {
    // Fake PUT to FakeStoreAPI
    const [firstname, ...lastnameArr] = profile.value.name.split(' ')
    const response = await $fetch(`https://fakestoreapi.com/users/${userId}`, {
      method: 'PUT',
      body: {
        email: profile.value.email,
        username: profile.value.username,
        password: passwordInput.value || 'existing_pass',
        name: {
          firstname: firstname || '',
          lastname: lastnameArr.join(' ') || ''
        },
        address: addressDetails.value,
        phone: profile.value.phone
      }
    })

    if (response) {
      saveMessage.value = 'Profile updated successfully! (Mock API)'
      setTimeout(() => { saveMessage.value = '' }, 3000)
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile.')
  } finally {
    isSaving.value = false
  }
}

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>
