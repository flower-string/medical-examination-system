import { Injectable } from '@nestjs/common';

@Injectable() 
export class UserService {
  private readonly users: string[] = ['User1', 'User2', 'User3'];
  findOne(id: string) {
    return 'UserService' + id;
  }

  findAll(): string[] {
    return this.users;
  }

  create(): string{
    return 'success create user';
  }
}