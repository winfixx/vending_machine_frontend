import { createApp } from 'vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { useCartDrinkStore } from './stores/useCartDrinkStore'
import { useDrinkStore } from './stores/useDrinkStore'
import { useUserStore } from './stores/useUserStore'
import { useVendingStore } from './stores/useVendingStore'
import { useVendingsListStore } from './stores/useVendingsListStore'

const app = createApp(App)

app.use(router)
app.use(createPinia())

export const userStore = useUserStore()
export const vendingStore = useVendingStore()
export const vendingsListStore = useVendingsListStore()
export const drinkStore = useDrinkStore()
export const cartDrinkStore = useCartDrinkStore()

app.mount('#app')
