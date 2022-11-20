import { UserEntity } from '@core/models/entities/user.entity';
export type UserDto = Omit<UserEntity, 'id'>;
export type CreateUserDto = UserDto;
