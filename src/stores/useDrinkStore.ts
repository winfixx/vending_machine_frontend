import type { AddDrinkRequest } from '@/dto/drinks/AddDrinkRequest'
import type { UpdateDrinkRequest } from '@/dto/drinks/UpdateDrinkRequest'
import DrinksService from '@/services/drinks/DrinksService'
import { defineStore } from 'pinia'

export const useDrinkStore = defineStore('drink', {
  state: () => {
    return {
      currentDrink: {
        drinkId: '',
        titleDrink: '',
        imageDrink: undefined as File | undefined,
        countDrink: 0,
        priceDrink: 0
      } as UpdateDrinkRequest
    }
  },
  actions: {
    setDrink(drink: UpdateDrinkRequest) {
      this.currentDrink = drink
    },
    async add(drinkDto: AddDrinkRequest) {
      await DrinksService.add(drinkDto)
    },
    async update(drinkDto: UpdateDrinkRequest) {
      await DrinksService.update(drinkDto)
    },
    async delete(drinkId: string) {
      await DrinksService.delete(drinkId)
    },
    async getAll() {
      await DrinksService.getAll()
    },
    async getById(drinkId: string) {
      await DrinksService.getById(drinkId)
    },
  }
})