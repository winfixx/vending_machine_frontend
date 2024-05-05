import { VENDING_MACHINES_API_URL } from '@/consts/base'
import type { AddVendingMachineRequest } from '@/dto/vendingMachines/AddVendingMachineRequest'
import type { GetVendingMachineResponse } from '@/dto/vendingMachines/GetVendingMachineResponse'
import type { UpdateVendingMachineRequest } from '@/dto/vendingMachines/UpdateVendingMachineRequest'
import apiAxios from '../axios'

export class VendingMachinesService {
  public async add(vendingDto: AddVendingMachineRequest) {
    const vendingId = (await apiAxios.post<string>(VENDING_MACHINES_API_URL, vendingDto)).data
    return vendingId
  }

  public async update(vendingDto: UpdateVendingMachineRequest) {
    const vendingId = (await apiAxios.patch<string>(VENDING_MACHINES_API_URL, vendingDto)).data
    return vendingId
  }

  public async delete(vendingId: string) {
    const vendingIdResponse = (await apiAxios.delete<string>(`${VENDING_MACHINES_API_URL}/${vendingId}`)).data
    return vendingIdResponse
  }

  public async getAll() {
    const vendings = (await apiAxios.get<GetVendingMachineResponse[]>(VENDING_MACHINES_API_URL)).data
    return vendings
  }

  public async getById(vendingId: string) {
    const vending = (await apiAxios.get<GetVendingMachineResponse>(`${VENDING_MACHINES_API_URL}/${vendingId}`)).data
    return vending
  }
}

export default new VendingMachinesService()