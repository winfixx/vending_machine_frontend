import type { UserRole } from './enum/UserRole'

export class User {
  constructor(
    public id: string,
    public name: string,
    public amountMoney: number,
    public role: UserRole
  ) { }
}