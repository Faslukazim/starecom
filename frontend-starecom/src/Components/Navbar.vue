<template>
  <div>
    <nav class="fixed top-0 bg-white-overlay-900 z-50 p-4 items-center w-full">
      <div class="flex justify-between">
        <router-link :to="{ name: 'ProductsListPage' }">
          <h1 class="text-2xl font-bold text-gray-800">Store</h1>
        </router-link>
        <button @click="cartDialogShown = true" class="flex">
          <FeatherIcon name="shopping-cart" class="h-6" />
          <Badge variant="solid">{{ cart.items.length }}</Badge>
        </button>
      </div>
    </nav>
  </div>
  <Dialog
    :options="{
      title: 'Your Cart',
      size: '3xl',
      actions: [
        {
          label: 'Proceed to Checkout',
          variant: 'solid',
          onClick: (close) => {
            close()
            router.push({
              name: 'CheckoutPage',
            })
          },
        },
      ],
    }"
    v-model="cartDialogShown"
  >
    <template #body-content>
      <ul>
        <li v-for="(item, index) in cart.items">
          *{{ index + 1 }}-{{ item.product }}
          <FormControl v-model="item.qty" type="number" placeholder="qty" />
          <Button
            @click="removeProductFromCart(index)"
            cariant="outline"
            theme="red"
            class="mt-2"
            >Remove</Button
          >
        </li>
      </ul>
    </template></Dialog
  >
</template>
<script setup>
import { FeatherIcon, Badge, Dialog, Button, FormControl } from 'frappe-ui'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cart = inject('cart')
const cartDialogShown = ref(false)
function removeProductFromCart(index) {
  cart.items.splice(index, 1)
}
</script>
