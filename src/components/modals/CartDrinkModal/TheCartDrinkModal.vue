<script setup lang="ts">
import { useCartDrinkStore } from '@/stores/useCartDrinkStore'
import { useUserStore } from '@/stores/useUserStore'
import { Modal, Toast } from 'bootstrap'
import { mapStores } from 'pinia'
import { Teleport } from 'vue'
import BaseGreenButton from '../../BaseGreenButton.vue'
import BaseGreenTitleH2 from '../../BaseGreenTitleH2.vue'
import BaseDrinksList from '../../DrinkList/BaseDrinksList.vue'
import LiveToastInfoSuccess from '../../toast/LiveToastInfoSuccess.vue'
import { default as CoinCartDrinkButton } from './CoinCartDrinkButton.vue'
import GroupInfoCartDrink from './GroupInfoCartDrink.vue'
import InfoCartDrink from './InfoCartDrink.vue'
import { useVendingStore } from '@/stores/useVendingStore'
import type { ExceptionReponse } from '@/dto/exceptions/ExceptionReponse'

defineProps<{
  showModal: boolean
}>()
</script>

<script lang="ts">
export default {
  data() {
    return {
      theModal: null as Modal | null,
      amountDeposited: 0,
      typeCoins: [1, 2, 5, 10],
      titleToast: '',
      messageToast: '',
      showToast: false
    }
  },
  computed: {
    ...mapStores(useCartDrinkStore, useUserStore, useVendingStore),
    cartVending() {
      return this.cartDrinkStore.cartsVendings.find(
        cart => cart.vendingId === this.vendingId
      )
    },
    totalCost() {
      return this.cartVending?.drinks.reduce(
        (acc, drink) => (acc += drink.countInCart * drink.price),
        0
      )
    },
    accessBuy() {
      return this.amountDeposited >= this.totalCost!
    },
    monetaryStatus() {
      return this.userStore.user.amountMoney - this.amountDeposited
    }
  },
  watch: {
    showModal(value) {
      this.theModal?.toggle()
    }
  },
  mounted() {
    this.theModal = new Modal(
      document.getElementById('cartDrinkModal') as Element
    )
  },
  methods: {
    insertCoins(coin: number) {
      this.amountDeposited += +coin
    },
    async buy() {
      if (this.cartVending) {
        console.log(this.cartVending)
        await this.cartDrinkStore
          .buy({
            amountDeposited: this.amountDeposited,
            vendingMachineId: this.cartVending!.vendingId,
            userId: this.userStore.user.id,
            drinksInOrder: this.cartVending!.drinks
          })
          .then(async () => {
            await this.userStore.refresh()
            await this.vendingStore.getById(this.cartVending!.vendingId)
            this.cartDrinkStore.clearCart(this.cartVending!.vendingId)
            this.messageToast = 'Успешно куплено'
            this.titleToast = 'Уведомление'
            this.showToast = !this.showToast
            this.theModal?.hide()
          })
          .catch(ex => {
            this.showToast = !this.showToast

            if (ex.response) {
              const exception = ex.response.data as ExceptionReponse
              this.titleToast = `Ошибка (${exception.status})`
              this.messageToast = exception.errorMessage
              return
            }

            this.titleToast = `Ошибка (${ex.code})`
            this.messageToast = ex.message
          })
          .finally(() => {
            this.amountDeposited = 0
          })
      }
    }
  },
  inject: ['vendingId']
}
</script>

<template>
  <Teleport to="body">
    <LiveToastInfoSuccess
      :show-toast="showToast"
      :title="titleToast"
      :msg="messageToast"
    />
  </Teleport>

  <div id="cartDrinkModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <BaseGreenTitleH2 msg="Корзина напитков" />
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <BaseDrinksList
            v-if="!!cartVending?.drinks.length"
            :drinks="cartVending.drinks"
          />
          <div v-else>
            <p class="text-danger text-center" style="font-size: 20px">
              В корзине нет напитков
            </p>
          </div>
        </div>

        <div v-show="cartVending?.drinks.length">
          <hr class="opacity-100 m-0" />
          <div class="modal-body">
            <div>
              <div>
                <h3 class="green">Внести сумму</h3>
              </div>
              <div class="d-flex gap-4 mt-3">
                <CoinCartDrinkButton
                  v-for="coin in typeCoins"
                  :key="coin"
                  :overflow-coin="accessBuy"
                  :amount-deposited="amountDeposited"
                  :coin="coin.toString()"
                  @insertCoinsClick="insertCoins"
                />
              </div>

              <GroupInfoCartDrink class="mt-2">
                <InfoCartDrink
                  :msg="`Внесенная сумма: ${amountDeposited} р.`"
                />
                <InfoCartDrink :msg="`Ваше состояние: ${monetaryStatus} р.`" />
              </GroupInfoCartDrink>

              <div class="mt-3">
                <button
                  @click="buy"
                  :disabled="!accessBuy"
                  :class="['btn', `btn-${accessBuy ? 'success' : 'secondary'}`]"
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer d-flex justify-content-between">
          <GroupInfoCartDrink>
            <InfoCartDrink
              :msg="`Кол-во товаров: ${cartVending?.drinks.length}`"
            />
            <InfoCartDrink :msg="`Итого: ${totalCost} р.`" />
            <InfoCartDrink
              :msg="`Денег в автомате: ${vendingStore.vending.amountMoney} р.`"
            />
          </GroupInfoCartDrink>
          <BaseGreenButton
            msg="Закрыть"
            data-bs-dismiss="modal"
            type-button="button"
          />
        </div>
      </div>
    </div>
  </div>
</template>
