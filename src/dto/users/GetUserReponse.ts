import type { UserRole } from '@/models/enum/UserRole'

export class GetUserReponse {
  constructor(
    public id: string,
    public name: string,
    public amountMoney: number,
    public role: UserRole
  ) { }
}