import { UserEntity } from '@common/entities/user.entity';
import { BaseEntity } from '@common/utils/base.entity';

export type CreateUserDto = Omit<UserEntity, keyof BaseEntity | 'role' | 'collections'>;
export type UpdateUserDto = Partial<CreateUserDto>;
