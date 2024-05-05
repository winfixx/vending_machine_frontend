import { USERS_API_URL } from '@/consts/base'
import type { LoginUserRequest } from '@/dto/users/LoginUserRequest'
import type { RegistrationUserRequest } from '@/dto/users/RegistrationUserRequest'
import apiAxios from '../axios'
import type { GetUserReponse } from '@/dto/users/GetUserReponse'
import type { UpdateUserRequest } from '@/dto/users/UpdateUserRequest'

class UsersService {
  public async registration(userDto: RegistrationUserRequest) {
    const user = (await apiAxios.post<GetUserReponse>(`${USERS_API_URL}/registration`, userDto)).data
    return user
  }

  public async login(userDto: LoginUserRequest) {
    const user = (await apiAxios.post<GetUserReponse>(`${USERS_API_URL}/login`, userDto)).data
    return user
  }

  public async update(userDto: UpdateUserRequest) {
    const user = (await apiAxios.patch<GetUserReponse>(`${USERS_API_URL}`, userDto)).data
    return user
  }

  public async refresh() {
    const user = (await apiAxios.get<GetUserReponse>(`${USERS_API_URL}/refresh`)).data
    return user
  }
}

export default new UsersService()