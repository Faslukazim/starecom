<template>
  <div class="p-5">
    <div v-if="productDoc">
      <h1 class="font-black text-gray-900 text-3xl">{{ productDoc.name }}</h1>
      <div class="sm:flex sm:gap-6">
        <!--Carousel-->
        <div class="flex gap-3 flex-col w-fit mt-5">
          <div
            @click="currentPreviewImageURL = image.image"
            :class="[
              'p-2 rounded-lg border-2 border-gray-600/25 hover:bg-black-overlay-50 cursor-pointer',
              currentPreviewImageURL === image.image
                ? 'border-gray-700/90'
                : '',
            ]"
            v-for="image in productDoc.images"
          >
            <img class="h-16 rounded-lg" :src="image.image" alt="image" />
          </div>
        </div>
        <!--Image-->
        <img class="max-w-lg" :src="currentPreviewImageURL" alt="" />
      </div>
      <div>{{ productDoc.description }}</div>
      <div class="space-y-2">
        <p class="text-3xl font-bold text-gray-900">
          {{ formatCurrency(productDoc.price, productDoc.currency) }}
        </p>
        <Button @click="addProductToCart" variant="solid" size="2xl">
          <template #prefix>
            <FeatherIcon class="h-5" name="shopping-cart" />
          </template>
          Add to Cart</Button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { Button, createDocumentResource, FeatherIcon } from 'frappe-ui'
import { computed, ref, watch, inject } from 'vue'
import { formatCurrency } from '../utils.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const route = useRoute()
const currentPreviewImageURL = ref(null)
const cart = inject('cart')
const productResource = createDocumentResource({
  doctype: 'Product',
  name: route.params.name,
  auto: true,
})
const productDoc = computed(() => {
  if (productResource.doc) {
    return productResource.doc
  }
})
watch(productDoc, () => {
  if (productDoc && productDoc.value.images.length > 0) {
    currentPreviewImageURL.value = productDoc.value.images[0].image
  }
})
function addProductToCart() {
  const productName = route.params.name
  cart.items.push({
    product: productName,
    qty: 1,
  })
  console.log(productName)
  toast.info('Added Successfully !', {
    autoClose: 1000,
    toastStyle: {
      fontSize: '12px',
      color: 'white',
      backgroundColor: 'black',
    },
  })
}
</script>
