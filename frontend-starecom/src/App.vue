<template>
  <Navbar class="" />
  <div class="mt-12">
    <router-view />
  </div>
</template>
<script setup>
import Navbar from './Components/Navbar.vue'
import { watch, inject } from 'vue'

const cart = inject('cart')

watch(cart.items, () => {
  console.log('watch works')
  localStorage.setItem('cart', JSON.stringify(cart))
})
</script>
