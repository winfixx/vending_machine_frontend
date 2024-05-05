import { DRINKS_API_URL } from '@/consts/base'
import type { AddDrinkRequest } from '@/dto/drinks/AddDrinkRequest'
import type { BuyDrinkRequest } from '@/dto/drinks/BuyDrinkRequest'
import type { BuyDrinkResponse } from '@/dto/drinks/BuyDrinkResponse'
import type { GetDrinkResponse } from '@/dto/drinks/GetDrinkResponse'
import type { UpdateDrinkRequest } from '@/dto/drinks/UpdateDrinkRequest'
import apiAxios from '../axios'

class DrinksService {
  public async buy(drinkDto: BuyDrinkRequest): Promise<BuyDrinkResponse> {
    const buyChange = (await apiAxios.post<BuyDrinkResponse>(`${DRINKS_API_URL}/buy`, drinkDto)).data
    return buyChange
  }

  public async add(drinkDto: AddDrinkRequest) {
    const formData = new FormData()
    formData.append('countDrink', drinkDto.countDrink.toString())
    formData.append('imageDrink', drinkDto.imageDrink!, drinkDto.imageDrink!.name)
    formData.append('priceDrink', drinkDto.priceDrink.toString())
    formData.append('titleDrink', drinkDto.titleDrink)
    formData.append('vendingMachineId', drinkDto.vendingMachineId)

    const drinkId = (await apiAxios.post<string>(DRINKS_API_URL, formData)).data
    return drinkId
  }

  public async update(drinkDto: UpdateDrinkRequest) {
    const formData = new FormData()
    if (drinkDto.countDrink) formData.append('countDrink', drinkDto.countDrink.toString())
    if (drinkDto.imageDrink) formData.append('imageDrink', drinkDto.imageDrink, drinkDto.imageDrink!.name)
    if (drinkDto.priceDrink) formData.append('priceDrink', drinkDto.priceDrink.toString())
    if (drinkDto.titleDrink) formData.append('titleDrink', drinkDto.titleDrink)
    
    formData.append('drinkId', drinkDto.drinkId)
    
    const drinkId = (await apiAxios.patch<string>(DRINKS_API_URL, formData)).data
    return drinkId
  }

  public async delete(drinkId: string) {
    const drinkIdResponse = (await apiAxios.delete<string>(`${DRINKS_API_URL}/${drinkId}`)).data
    return drinkIdResponse
  }

  public async getAll() {
    const drinks = (await apiAxios.get<GetDrinkResponse[]>(DRINKS_API_URL)).data
    return drinks
  }

  public async getById(drinkId: string) {
    const drink = (await apiAxios.get<GetDrinkResponse>(`${DRINKS_API_URL}/${drinkId}`)).data
    return drink
  }
}

export default new DrinksService()