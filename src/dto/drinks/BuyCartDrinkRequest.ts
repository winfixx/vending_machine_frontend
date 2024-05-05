export class BuyCartDrinkRequest {
  constructor(
    public id: string,
    public price: number,
    public title: string,
    public image: string,
    public count: number,
    public countInCart: number,
  ) { }
}