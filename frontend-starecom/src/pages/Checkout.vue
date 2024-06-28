<template>
  <div class="pt-5 flex flex-col items-center justify-center">
    <h1>Checkout</h1>
    <p v-if="cart.items.length === 0">Cart Empty</p>
    <Button
      class="mt-5"
      v-else
      :loading="placeOrderResource.loading"
      @click="placeOrder"
      variant="solid"
      size="md"
      >Place Order</Button
    >
    <ErrorMessage :message="placeOrderResource.error" />
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
