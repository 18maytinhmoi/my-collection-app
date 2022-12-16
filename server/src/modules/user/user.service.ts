import { UserEntity } from '@common/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './models/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: EntityRepository<UserEntity>
  ) {}

  async create(dto: CreateUserDto) {
    const newUser = this._userRepository.create(dto);
    await this._userRepository.persistAndFlush(newUser);
    return newUser;
  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      const entity = await this._userRepository.findOne(id);

      if (entity == null) {
        throw new BadRequestException();
      }

      console.log(dto);
      Object.keys(dto).forEach(key => {
        entity[key] = dto[key];
      });

      await this._userRepository.flush();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    return this._userRepository.findOne(id);
  }

  async findByUsername(username: string) {
    return this._userRepository.findOne({ username });
  }

  async getAll() {
    return this._userRepository.findAll();
  }
}
