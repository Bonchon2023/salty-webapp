// app/composables/useProducts.ts
// use database from Fake Store API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProducts = () => {
  // ใช้ useState แทน ref เพื่อให้ข้อมูลแชร์กันทั่วทั้ง app (global shared state)
  const products = useState<Product[]>('products', () => [])
  const isLoading = useState<boolean>('products_loading', () => false)
  const error = useState<any>('products_error', () => null)

  const fetchProducts = async () => {
    // ถ้าข้อมูลมีอยู่แล้ว ไม่ต้อง fetch ซ้ำ
    if (products.value.length > 0) return

    isLoading.value = true
    error.value = null
    try {
      const data = await $fetch<Product[]>('https://fakestoreapi.com/products')
      products.value = data
    } catch (err) {
      error.value = err
      console.error('Failed to fetch products:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Function to fetch a single product by ID (always fetches directly from API)
  const fetchProductById = async (id: string | number) => {
    try {
      return await $fetch<Product>(`https://fakestoreapi.com/products/${id}`)
    } catch (err) {
      console.error(`Failed to fetch product with ID ${id}:`, err)
      return null
    }
  }

  // Helper computed functions
  const getBestSellers = () => products.value.filter(p => p.rating && p.rating.rate >= 4.5)
  const getRecommended = () => products.value.slice(0, 8)
  const getProductById = (id: string | number) => products.value.find(p => p.id === Number(id))

  return { 
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    getBestSellers,
    getRecommended, 
    getProductById 
  }
}