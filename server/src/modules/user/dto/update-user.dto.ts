import { BaseKeys } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/common/entities/user.entity';

export type UpdateUserDto = Omit<UserEntity, BaseKeys>;
