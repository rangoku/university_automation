import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  private readonly users: Record<number, User> = { }
  private id: number = 0

  create(createUserDto: CreateUserDto) {
    this.users[this.id] =  { id: this.id, ...createUserDto } as unknown as User
    return this.users[this.id++]
  }

  findOne(id: number) {
    return this.users[id]
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (id in this.users) {
      this.users[id] = { ...this.users[id], ...updateUserDto } as User
      return this.users[id]
    }

    return undefined
  }

  remove(id: number) {
    const deleted = this.users[id]
    delete this.users[id]
    return deleted
  }
}