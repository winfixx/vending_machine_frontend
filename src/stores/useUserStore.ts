import type { LoginUserRequest } from '@/dto/users/LoginUserRequest'
import type { RegistrationUserRequest } from '@/dto/users/RegistrationUserRequest'
import { UpdateUserRequest } from '@/dto/users/UpdateUserRequest'
import type { User } from '@/models/User'
import { UserRole } from '@/models/enum/UserRole'
import UsersService from '@/services/users/UsersService'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: '',
      amountMoney: 0,
      name: '',
      role: UserRole.User
    } as User
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    },
    async login(userDto: LoginUserRequest) {
      return await UsersService.login(userDto)
        .then(user => {
          this.setUser(user)
          return user
        })
    },
    async registration(userDto: RegistrationUserRequest) {
      return await UsersService.registration(userDto)
        .then(user => {
          this.setUser(user)
          return user
        })
    },
    async refresh() {
      return await UsersService.refresh()
        .then(user => {
          this.setUser(user)
          return user
        })
    },
    async update(userDto: UpdateUserRequest) {
      return await UsersService.update(userDto)
        .then(() => {
          this.refresh()
        })
    }
  }
})