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
          <h3>{{ profile.name }}</h3>
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
            <NuxtLink to="/login" style="color: #ff4d4d;">
              <ion-icon name="log-out-outline"></ion-icon> Logout
            </NuxtLink>
          </li>
        </ul>
      </aside>

      <div class="account-content">
        
        <div v-show="activeTab === 'profile'" class="tab-content active">
          <h2 class="section-header">Edit Profile</h2>
          <form class="shipping-form" style="box-shadow: none; padding: 0;" @submit.prevent="saveProfile">
            <label for="acc-name">Full Name:</label>
            <input type="text" id="acc-name" v-model="profile.name" required>

            <label for="acc-email">Email Address:</label>
            <input type="email" id="acc-email" v-model="profile.email" required>

            <label for="acc-phone">Phone Number:</label>
            <input type="tel" id="acc-phone" v-model="profile.phone" placeholder="08X-XXX-XXXX">

            <div style="margin-top: 20px;">
              <label for="acc-pass">New Password (leave blank to keep current):</label>
              <input type="password" id="acc-pass" style="width: 100%; padding: 0.8em; border: 1px solid #ccc; border-radius: 6px;">
            </div>

            <button type="submit" class="cta-button" style="margin-top: 20px;">Save Changes</button>
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
                <tr>
                  <td>#ORD-241225</td>
                  <td>25 Dec 2024</td>
                  <td><span class="status-badge status-delivered">Delivered</span></td>
                  <td>฿3,590</td>
                  <td><a href="#" style="color: var(--primary-color);">View</a></td>
                </tr>
                <tr>
                  <td>#ORD-241111</td>
                  <td>11 Nov 2024</td>
                  <td><span class="status-badge status-shipped">Shipped</span></td>
                  <td>฿2,260</td>
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
                {{ profile.name }}<br>
                123 Silom Road, Bang Rak<br>
                Bangkok, Thailand 10500<br>
                Tel: {{ profile.phone || '081-234-5678' }}
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
import { ref } from 'vue'

// กำหนด Tab เริ่มต้นเป็นหน้า profile
const activeTab = ref('profile')

// ข้อมูลจำลองของผู้ใช้
const profile = ref({
  name: 'Guest User',
  email: 'member@example.com',
  phone: ''
})

// ฟังก์ชันเวลากดปุ่ม Save Changes
const saveProfile = () => {
  alert('Profile updated successfully!')
}
</script>

<style scoped>
/* ทำให้เวลาเมาส์ชี้ที่แท็บแล้วเป็นรูปนิ้วคลิก */
.sidebar-menu a {
  transition: all 0.3s ease;
}
</style>