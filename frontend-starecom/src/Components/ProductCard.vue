<template>
  <router-link
    :to="{
      name: 'ProductDetailsPage',
      params: {
        name: product.name,
      },
    }"
    href="#"
    class="shadow-md rounded-sm p-8 space-y-2 flex justify-between flex-col hover:scale-105 transition-all"
  >
    <img class="h-36 w-44" :src="product.preview_image" alt="" />
    <p class="text-base text-gray-800 font-medium mt-2">
      {{ product.name }}
    </p>
    <p class="text-xl font-bold text-gray-900">
      {{ formatCurrency(product.price, product.currency) }}
    </p>
  </router-link>
</template>
<script setup>
import { formatCurrency } from '@/utils'

const props = defineProps({
  product: Object,
})
</script>
