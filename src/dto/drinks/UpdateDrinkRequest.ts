export class UpdateDrinkRequest {
  constructor(
    public drinkId: string,
    public titleDrink?: string,
    public imageDrink?: File | undefined,
    public countDrink?: number,
    public priceDrink?: number
  ) { }
}