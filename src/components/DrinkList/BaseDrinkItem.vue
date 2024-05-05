<script setup lang="ts">
import { BASE_STATIC_API_URL } from '@/consts/base'
import type { Drink } from '@/models/Drink'
import { useCartDrinkStore } from '@/stores/useCartDrinkStore'
import { mapActions, mapStores } from 'pinia'
import BaseAddInCartIcon from '../icons/BaseAddInCartIcon.vue'
import BaseCartMinusIcon from '../icons/BaseCartMinusIcon.vue'
import BaseCartPlusIcon from '../icons/BaseCartPlusIcon.vue'
import BaseRemoveFromCartIcon from '../icons/BaseRemoveFromCartIcon.vue'

defineProps<{
  drink: Drink
}>()
</script>
<script lang="ts">
export default {
  methods: {
    ...mapActions(useCartDrinkStore, [
      'setDrinkInCart',
      'removeDrinkFromCart',
      'decrimentDrink',
      'incrementDrink'
    ]),
    addInCart() {
      if (!this.haveInCart && this.haveCart)
        this.setDrinkInCart(this.drink, this.haveCart.vendingId)
    },
    removeFromCart() {
      this.removeDrinkFromCart(this.haveInCart!.id, this.haveCart!.vendingId)
    },
    incrementCount() {
      if (!this.haveInCart) {
        this.addInCart()
      } else {
        if (this.countInCart < this.drink.count) {
          this.incrementDrink(this.haveInCart.id, this.haveCart!.vendingId)
        }
      }
    },
    decrimentCount() {
      if (this.countInCart > 1) {
        this.decrimentDrink(this.drink.id, this.haveCart!.vendingId)
      } else {
        this.removeDrinkFromCart(this.haveInCart!.id, this.haveCart!.vendingId)
      }
    }
  },
  computed: {
    ...mapStores(useCartDrinkStore),
    haveCart() {
      return this.cartDrinkStore.cartsVendings.find(
        cart => cart.vendingId === this.vendingId
      )
    },
    haveInCart() {
      if (this.haveCart)
        return this.cartDrinkStore.cartsVendings
          .find(cart => cart.vendingId === this.vendingId)!
          .drinks.find(drinkIn => drinkIn.id === this.drink.id)
    },
    countInCart() {
      return this.haveInCart ? this.haveInCart.countInCart : 0
    },
    disableAddInCard() {
      return this.haveInCart ? true : false
    }
  },
  inject: ['vendingId']
}
</script>

<template>
  <div
    class="card col border-2 border-dark p-0"
    style="width: 15rem; background: #181818"
  >
    <img
      :src="BASE_STATIC_API_URL + `/${drink.image}`"
      class="card-img-top"
      style="max-width: 100%; max-height: 170px; object-fit: cover"
    />
    <div
      class="card-body d-flex flex-column py-2 justify-content-between gap-2"
    >
      <div>
        <h5 class="card-title text-white">{{ drink.title }}</h5>

        <p class="card-text text-white">
          <span>Кол-во в автомате: {{ drink.count }}</span> <br />
          <span> Цена: {{ drink.price }}</span> <br />
          <span v-show="countInCart">Кол-во в корзине: {{ countInCart }}</span>
          <br />
        </p>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <BaseCartMinusIcon
          :disabled="!haveInCart || countInCart <= 0"
          @click="decrimentCount"
        />
        <div>
          <BaseAddInCartIcon
            :disabled="disableAddInCard || drink.count === 0"
            @click="addInCart"
          />
          <BaseRemoveFromCartIcon
            :disabled="!disableAddInCard || drink.count === 0"
            class="mt-1"
            @click="removeFromCart"
          />
        </div>
        <BaseCartPlusIcon
          :disabled="countInCart >= drink.count"
          @click="incrementCount"
        />
      </div>
    </div>
  </div>
</template>
