// app/composables/useProducts.ts
export const useProducts = () => {
  // ใช้ useState เพื่อให้ข้อมูลทำงานได้ดีทั้งฝั่ง Server (SSR) และ Client
  const products = useState('products', () => [
    {
      id: 128,
      name: "Samsung Galaxy S25 Ultra - Titanium Gray",
      imageUrl: "https://www.iphone-droid.net/spec/wp-content/uploads/2025/01/Samsung-Galaxy-S25-Ultra-Titanium-Gray.jpg",
      price: 52900,
      rating: "⭐️⭐️⭐️⭐️☆ (30)",
      category: ["smartphone", "allitems"],
      desc: "The Samsung Galaxy S25 Ultra features a stunning display, powerful performance, and an advanced camera system to capture every moment in incredible detail."
    },
    {
      id: 129,
      status: 1,  // 1 = best seller
      name: "Apple iPhone 17 Pro Max 256GB Cosmic Orange",
      imageUrl: "https://media-cdn.bnn.in.th/533314/iPhone_17_Pro_Max_01.jpg",
      price: 54500,
      rating: "⭐️⭐️⭐️⭐️☆ (180)",
      category: ["smartphone", "allitems"],
      desc: "The iPhone 17 Pro Max offers a sleek design, powerful A17 Bionic chip, and a Pro camera system that takes photography to the next level."
    },
    {
      id: 130,
      name: "Apple iPad Pro 11-inch Wi-Fi 256GB",
      imageUrl: "https://media-cdn.bnn.in.th/395474/iPad-Pro-11-inch-M4-Wi-Fi-SpaceBlack-2-square_medium.jpg",
      price: 34900,
      rating: "⭐️⭐️⭐️⭐️ (77)",
      category: ["smartphone", "allitems"],
      desc: "The iPad Pro 11-inch offers a powerful M4 chip, a stunning Liquid Retina display, and versatile features for both work and play."
    },
    {
      id: 101,
      status: 1,
      name: "Apple AirPods Max",
      imageUrl: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/og-airpods-max-202409?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1724144125817",
      price: 15900,
      rating: "⭐️⭐️⭐️⭐️⭐️ (150)",
      category: ["it-gadget", "allitems"],
      desc: "Apple AirPods Max delivers high-fidelity audio, active noise cancellation, and a comfortable over-ear design for an immersive listening experience."
    },
    {
      id: 112,
      status: 1,
      name: "Keychron K3 Pro Mechanical",
      imageUrl: "https://media-cdn.bnn.in.th/364611/keychron-gaming-keyboard-k3-pro-00-square_medium.jpg",
      price: 3990,
      rating: "⭐️⭐️⭐️⭐️⭐️ (210)",
      category: ["it-gadget", "allitems"],
      desc: "The Keychron K3 Pro Mechanical keyboard offers a compact design, hot-swappable switches, and RGB lighting for a customizable typing experience."
    },
    {
      id: 120,
      status: 1,
      name: "Monitor 24 DELL S2421HN",
      imageUrl: "https://img.advice.co.th/images_nas/pic_product4/A0133430/A0133430OK_BIG_1.jpg",
      price: 2990,
      rating: "⭐️⭐️⭐️⭐️☆ (95)",
      category: ["it-gadget", "allitems"],
      desc: "The DELL S2421HN monitor features a 24-inch Full HD display, sleek design, and vibrant colors for an enhanced viewing experience."
    },
    {
      id: 123,
      status: 1,
      name: "Nike Men's Air Max 95 Shoes",
      imageUrl: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/eae31d63-1a01-4419-acf2-10061073f5ff/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B8%A7-nike-sb-air-max-95-x-eric-koston-obsidian-and-speed-yellow-hq8492-400.jpg",
      price: 6600,
      rating: "⭐️⭐️⭐️⭐️⭐️ (330)",
      category: ["sport", "allitems"],
      desc: "Nike Men's Air Max 95 Shoes offer a stylish design, comfortable fit, and excellent cushioning for all-day wear."
    },
    {
      id: 125,
      status: 1,
      name: "CELINE LOOSE T-SHIRT",
      imageUrl: "https://image.celine.com/1302276dfc4a47a2/original/2X764671Q-38AW_1_WIN21_W.jpg?im=Resize=(1200);AspectCrop=(1,1),xPosition=.5,yPosition=.5",
      price: 21000,
      rating: "⭐️⭐️⭐️⭐️ (120)",
      category: ["clothing", "allitems"],
      desc: "CELINE LOOSE T-SHIRT offers a comfortable fit and timeless style for everyday wear."
    }
    // หมายเหตุ: สามารถนำข้อมูลสินค้าที่เหลือใน products.js มาต่อท้ายได้เลยครับ
  ])

  // ฟังก์ชันสำหรับดึงสินค้าไปแสดงผล
  const getBestSellers = () => products.value.filter(p => p.status === 1)
  const getRecommended = () => products.value.slice(0, 8) // ดึง 8 ชิ้นแรก
  const getProductById = (id: number) => products.value.find(p => p.id === Number(id))

  return { 
    products, 
    getBestSellers, 
    getRecommended, 
    getProductById 
  }
}