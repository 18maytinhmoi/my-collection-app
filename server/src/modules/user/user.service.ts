import { Injectable } from '@nestjs/common';
import { getXataClient } from './../../xata';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly _client = getXataClient();

  async create(dto: CreateUserDto) {
    return this._client.db.Users.create(dto);
  }

  async update(id: string, dto: UpdateUserDto) {
    return this._client.db.Users.update(id, dto);
  }

  async findOne(id: string) {
    return this._client.db.Users.getFirst();
  }

  async getAll() {
    return this._client.db.Users.getAll();
  }
}
