import type { GetVendingMachineResponse } from '@/dto/vendingMachines/GetVendingMachineResponse'
import type { Drink } from '@/models/Drink'
import VendingMachinesService from '@/services/vendingMachine/VendingMachinesService'
import { defineStore } from 'pinia'

export const useVendingStore = defineStore('vending', {
  state: () => {
    return {
      vending: {
        id: '',
        title: '',
        amountMoney: 0,
        drinks: [] as Drink[]
      }
    }
  },
  actions: {
    setVending(vending: GetVendingMachineResponse) {
      this.vending = vending
    },
    async getById(vendingId: string) {
      return await VendingMachinesService.getById(vendingId)
        .then(vending => {
          this.setVending(vending)
          return vending
        })
    }
  }
})