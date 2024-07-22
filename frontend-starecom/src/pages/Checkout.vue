<template>
  <div class="pt-5 flex flex-col items-center justify-center">
    <img class="h-72 animate-pulse" src="/packing.png" alt="" />
    <div class="flex mt-5 gap-2">
      <p v-if="cart.items.length === 0">Cart Empty</p>
      <Button
        class=""
        v-else
        :loading="placeOrderResource.loading"
        @click="placeOrder"
        variant="solid"
        size="md"
        >Place Order</Button
      >
      <ErrorMessage :message="placeOrderResource.error" />
      <a
        class="border p-0.5 rounded-md bg-green-500 text-white font-semibold"
        href="http://127.0.0.1:5500/razorpay.html"
        >Pay Now</a
      >
    </div>
  </div>
</template>

<script setup>
import { createResource, Button, ErrorMessage } from 'frappe-ui'
import { inject } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const cart = inject('cart')
const placeOrderResource = createResource({
  url: 'starecom.api.place_order',
  makeParams() {
    return {
      products: cart.items,
    }
  },
})

function placeOrder() {
  placeOrderResource
    .submit()
    .then(() => {
      toast.success('Order placed successfully!', {
        autoClose: 1000,
        toastStyle: {
          fontSize: '12px',
          color: 'white',
          backgroundColor: 'black',
        },
      })
    })
    .catch((error) => {
      toast.error('Order failed. Please try again.', {
        autoClose: 1000,
        toastStyle: {
          fontSize: '12px',
          color: 'white',
          backgroundColor: 'black',
        },
      })
    })
}
</script>
