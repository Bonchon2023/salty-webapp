<template>
  <div class="container">
    <AppNavbar :key="$route.fullPath" />

    <div class="main">
      <slot />
    </div>

    <AppFooter />
    
    <button id="backToTopBtn" title="กลับไปด้านบน">↑</button>
  </div>
</template>