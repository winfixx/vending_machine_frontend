import type { BuyCartDrinkRequest } from './BuyCartDrinkRequest'

export class BuyDrinkRequest {
  constructor(
    public userId: string,
    public vendingMachineId: string,
    public amountDeposited: number,
    public drinksInOrder: BuyCartDrinkRequest[]
  ) { }
}