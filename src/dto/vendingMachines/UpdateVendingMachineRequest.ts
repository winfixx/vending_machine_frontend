export class UpdateVendingMachineRequest {
  constructor(
    public idVendingMachine: string,
    public titleVendingMachine?: string,
    public amountMoneyVendingMachine?: number
  ) { }
}