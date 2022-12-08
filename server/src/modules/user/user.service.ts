import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/entities/user.entity';
import { getXataClient } from './../../xata';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly _client = getXataClient();

  async create(dto: CreateUserDto) {
    const entity = new UserEntity();
    entity.username = dto.username;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.password = dto.password;
    entity.email = dto.email;

    return this._client.db.Users.create(entity);
  }

  async update(id: string, dto: Partial<UpdateUserDto>) {
    return this._client.db.Users.update(id, {
      ...dto,
      updateTime: new Date(),
    });
  }

  async findOne(id: string) {
    return this._client.db.Users.filter('id', id).getFirst();
  }

  async findByUsername(username) {
    return this._client.db.Users.filter('username', username).getFirst();
  }

  async getAll() {
    return this._client.db.Users.getAll();
  }
}
