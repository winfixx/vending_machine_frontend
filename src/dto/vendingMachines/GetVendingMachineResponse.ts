import type { Drink } from '@/models/Drink'
import { VendingMachine } from '@/models/VendingMachine'

export class GetVendingMachineResponse extends VendingMachine {
  constructor(
    public id: string,
    public title: string,
    public amountMoney: number,
    public drinks: Drink[]
  ) {
    super(id, title, amountMoney)
  }
}