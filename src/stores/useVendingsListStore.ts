import type { AddVendingMachineRequest } from '@/dto/vendingMachines/AddVendingMachineRequest'
import type { UpdateVendingMachineRequest } from '@/dto/vendingMachines/UpdateVendingMachineRequest'
import type { VendingMachine } from '@/models/VendingMachine'
import VendingMachinesService from '@/services/vendingMachine/VendingMachinesService'
import { defineStore } from 'pinia'

export const useVendingsListStore = defineStore('vendingsList', {
  state: () => {
    return {
      vendingsList: [{
        id: '',
        title: '',
        amountMoney: 0
      }] as VendingMachine[]
    }
  },
  actions: {
    setVendingList(vending: VendingMachine[]) {
      this.vendingsList = vending
    },
    async add(vendingDto: AddVendingMachineRequest) {
      return await VendingMachinesService.add(vendingDto)
    },
    async update(vendingDto: UpdateVendingMachineRequest) {
      return await VendingMachinesService.update(vendingDto)
    },
    async delete(vendingId: string) {
      return await VendingMachinesService.delete(vendingId)
    },
    async getAll() {
      return await VendingMachinesService.getAll()
        .then(vendingsList => {
          this.setVendingList(vendingsList)
        })
    }
  }
})