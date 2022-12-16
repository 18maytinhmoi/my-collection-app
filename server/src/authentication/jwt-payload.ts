import { UserEntity } from '@common/entities/user.entity';

export type JwtPayload = Pick<UserEntity, 'email' | 'username' | 'role'>;
