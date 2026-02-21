<template>
  <div style="margin-top: 2rem;">
    <button class="back-btn" style="margin-bottom: 20px;" @click="goBack">
      <ion-icon name="arrow-back-outline"></ion-icon> Back to Cart
    </button>

    <div class="checkout-layout">
      <div class="checkout-left">
        <div class="shipping-form" style="margin-bottom: 30px;">
          <h3>Shipping Address</h3>
          <form @submit.prevent>
            <div class="row-inputs">
              <div>
                <label>First Name</label>
                <input type="text" v-model="form.firstName" required>
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" v-model="form.lastName" required>
              </div>
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" v-model="form.phone" required>
            </div>
            <div>
              <label>Full Address</label>
              <textarea rows="3" v-model="form.address" required></textarea>
            </div>
          </form>
        </div>

        <div class="shipping-form">
          <h3>Payment Method</h3>
          
          <div class="payment-item-wrapper">
            <input type="radio" name="payment" id="pay-card" value="card" class="hidden-radio" v-model="paymentMethod">
            <label for="pay-card" class="payment-button">
              <ion-icon name="card-outline"></ion-icon> Credit / Debit Card
            </label>
            <div class="payment-collapse-content">
              <div class="payment-inner-padding">
                <input type="text" placeholder="Card Number (0000 0000 0000 0000)">
                <div class="row-inputs" style="margin-top: 10px;">
                  <input type="text" placeholder="MM/YY">
                  <input type="text" placeholder="CVV">
                </div>
              </div>
            </div>
          </div>

          <div class="payment-item-wrapper">
            <input type="radio" name="payment" id="pay-prompt" value="promptpay" class="hidden-radio" v-model="paymentMethod">
            <label for="pay-prompt" class="payment-button">
              <ion-icon name="qr-code-outline"></ion-icon> PromptPay (QR Code)
            </label>
            <div class="payment-collapse-content">
              <div class="payment-inner-padding" style="text-align: center;">
                <ion-icon name="scan-circle-outline" style="font-size: 5rem; color: var(--primary-color);"></ion-icon>
                <p>QR Code will be generated in the next step.</p>
              </div>
            </div>
          </div>

          <div class="payment-item-wrapper">
            <input type="radio" name="payment" id="pay-cod" value="cod" class="hidden-radio" v-model="paymentMethod">
            <label for="pay-cod" class="payment-button">
              <ion-icon name="cash-outline"></ion-icon> Cash on Delivery (COD)
            </label>
            <div class="payment-collapse-content">
              <div class="payment-inner-padding">
                <p>Pay with cash upon delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="order-summary">
        <h3>Order Summary</h3>
        <div v-if="cartItems.length > 0">
          <div v-for="item in cartItems" :key="item.id" style="display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.95rem;">{{ item.name }}</div>
              <div style="color: var(--text-light); font-size: 0.85rem;">Qty: {{ item.quantity }}</div>
            </div>
            <div style="font-weight: 600;">฿{{ (item.price * item.quantity).toLocaleString('en-US') }}</div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 20px; font-size: 1.2rem; font-weight: 700;">
            <span>Total:</span>
            <span style="color: var(--primary-color);">฿{{ cartTotalPrice.toLocaleString('en-US') }}</span>
          </div>

          <button class="cta-button" style="width: 100%; margin-top: 25px; justify-content: center;" @click="handlePlaceOrder" :disabled="isProcessing">
            <ion-icon name="checkmark-circle-outline"></ion-icon> Place Order
          </button>
        </div>
        <div v-else style="text-align: center; color: var(--text-light); margin-top: 20px;">
          Your cart is empty.
        </div>
      </div>
    </div>

    <div class="modal-overlay" :style="{ display: showModal ? 'flex' : 'none' }">
      <div class="modal-content">
        <div v-if="isProcessing">
          <div class="spinner"></div>
          <h3>Processing Payment...</h3>
          <p style="color: var(--text-light);">Please do not close this window.</p>
        </div>
        
        <div v-else>
          <ion-icon name="checkmark-circle" style="font-size: 5rem; color: #27ae60;"></ion-icon>
          <h3 style="margin: 15px 0;">Payment Successful!</h3>
          <p style="color: var(--text-light); margin-bottom: 25px;">Thank you for your purchase.</p>
          <button class="cta-button" style="width: 100%; justify-content: center;" @click="finishOrder">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// ดึงข้อมูลและฟังก์ชันเคลียร์ตะกร้ามา
const { cartItems, cartTotalPrice, clearCart } = useCart()

// ตัวแปรฟอร์มและสถานะต่างๆ
const form = ref({ firstName: '', lastName: '', phone: '', address: '' })
const paymentMethod = ref('card') // ค่าเริ่มต้นเป็น Credit Card

// สถานะของ Modal
const showModal = ref(false)
const isProcessing = ref(false)

const goBack = () => {
  router.push('/cart')
}

// เมื่อกดปุ่ม Place Order
const handlePlaceOrder = () => {
  // เช็คว่ากรอกข้อมูลครบไหม (แบบง่ายๆ)
  if (!form.value.firstName || !form.value.address || !form.value.phone) {
    alert("Please fill in your shipping address completely.")
    return
  }
  if (cartItems.value.length === 0) {
    alert("Your cart is empty.")
    return
  }

  // เปิด Modal และเริ่มโหลด
  showModal.value = true
  isProcessing.value = true

  // จำลองเวลาประมวลผลเซิร์ฟเวอร์ 2.5 วินาที
  setTimeout(() => {
    isProcessing.value = false // หยุดหมุนโชว์เครื่องหมายติ๊กถูก
  }, 2500)
}

// เมื่อกดปุ่ม Continue Shopping ใน Modal ที่สำเร็จแล้ว
const finishOrder = () => {
  showModal.value = false
  clearCart() // ล้างตะกร้าให้ว่าง
  router.push('/') // เด้งกลับไปหน้าแรก
}
</script>