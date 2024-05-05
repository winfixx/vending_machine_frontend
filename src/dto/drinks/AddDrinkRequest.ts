export class AddDrinkRequest {
  constructor(
    public priceDrink: number,
    public titleDrink: string,
    public countDrink: number,
    public imageDrink: File | undefined,
    public vendingMachineId: string
  ) { }
}