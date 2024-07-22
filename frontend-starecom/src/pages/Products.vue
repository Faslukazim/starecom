<template>
  <div class="p-6">
    <div class="flex justify-center p-1 rounded-md shadow-gray-50">
      <img
        class="w-screen rounded-sm animate-pulse"
        src="/banner-1.png"
        alt="dsfds"
      />
    </div>
    <h2 class="mt-5 font-semibold text-lg text-green-500 border-b-2 w-fit">
      Our Products
    </h2>

    <div class="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-3" v-if="productList">
      <ProductCard
        v-for="product in productList"
        :key="product.name"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { createListResource } from 'frappe-ui'
import { computed } from 'vue'
import ProductCard from '../Components/ProductCard.vue'

const productsResource = createListResource({
  doctype: 'Product',
  fields: ['name', 'preview_image', 'price', 'currency'],
  auto: true,
})

const productList = computed(() => {
  if (productsResource.list.data) {
    return productsResource.list.data
  }
  return []
})
</script>
