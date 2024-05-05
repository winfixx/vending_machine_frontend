export class AddVendingMachineRequest {
  constructor(
    public titleVendingMachine: string,
    public amountMoneyVendingMachine?: number
  ) { }
}