import { onMounted } from 'vue'

export const useScrollReveal = () => {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          // Optional: observer.unobserve(entry.target) to only animate once
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    })

    // Make sure DOM is fully ready
    setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el)
      })
    }, 100)
  })
}
