import type { UserRole } from '@/models/enum/UserRole'

export class UpdateUserRequest {
  constructor(
    public userId: string,
    public name?: string,
    public password?: string,
    public role?: UserRole,
    public amountMoney?: number,
  ) { }
}