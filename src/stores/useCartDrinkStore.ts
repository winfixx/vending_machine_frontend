import type { BuyDrinkRequest } from '@/dto/drinks/BuyDrinkRequest'
import type { Drink } from '@/models/Drink'
import DrinksService from '@/services/drinks/DrinksService'
import { defineStore } from 'pinia'

export const useCartDrinkStore = defineStore('cartDrink', {
  state: () => {
    return {
      cartsVendings: [] as { vendingId: string, drinks: (Drink & { countInCart: number })[] }[]
    }
  },
  actions: {
    async buy(order: BuyDrinkRequest) {
      await DrinksService.buy(order)
    },
    addCart(vendingId: string) {
      this.cartsVendings.push({ vendingId, drinks: [] })
    },
    clearCart(vendingId: string) {
      this.cartsVendings.find(cart => cart.vendingId === vendingId)!.drinks = []
    },
    setDrinkInCart(drink: Drink, vendingId: string) {
      const cart = this.cartsVendings.find(cart => cart.vendingId === vendingId)
      if (cart) {
        cart.drinks.push({ ...drink, countInCart: 1 })
      }
    },
    removeDrinkFromCart(drinkId: string, vendingId: string) {
      const cart = this.cartsVendings.find(cart => cart.vendingId === vendingId)
      if (cart) {
        const drinks = cart.drinks
        for (let i = 0; i < drinks.length; i++) {
          if (drinks[i].id === drinkId) {
            drinks.splice(i, 1)
          }
        }
      }
    },
    incrementDrink(drinkId: string, vendingId: string) {
      const drink = this
        .cartsVendings.find(cart => cart.vendingId === vendingId)!
        .drinks.find(drink => drink.id === drinkId)

      if (drink) ++drink.countInCart
    },
    decrimentDrink(drinkId: string, vendingId: string) {
      const drink = this
        .cartsVendings.find(cart => cart.vendingId === vendingId)!
        .drinks.find(drink => drink.id === drinkId)

      if (drink) --drink.countInCart
    }
  }
})