import './index.css'

import { createApp, reactive } from 'vue'
import router from './router'
import App from './App.vue'

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)

let cartData = JSON.parse(localStorage.getItem('cart') || '{"items": []}')

if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify(cartData))
}

const cart = reactive(cartData)

app.provide('cart', cart)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

app.mount('#app')
