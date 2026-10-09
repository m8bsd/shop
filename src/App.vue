<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <NavBar />
    <main class="container py-4 flex-grow-1">
      <router-view />
    </main>
    <footer class="bg-dark text-light-emphasis py-3 mt-auto">
      <div class="container text-center small text-white-50">
        &copy; {{ new Date().getFullYear() }} Vue Shop &middot; Built with Vue 3 &amp; Bootstrap 5
      </div>
    </footer>
  </div>
</template>
