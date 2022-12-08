// Generated by Xata Codegen 0.21.0. Please do not edit.
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord
} from '@xata.io/client';
import { buildClient } from '@xata.io/client';

const tables = [
  {
    name: 'Users',
    columns: [
      { name: 'password', type: 'string', notNull: true, defaultValue: '' },
      { name: 'username', type: 'string', unique: true },
      { name: 'email', type: 'email', unique: true },
      { name: 'firstName', type: 'string', notNull: true, defaultValue: '' },
      { name: 'lastName', type: 'string', notNull: true, defaultValue: '' },
      { name: 'role', type: 'string', notNull: true, defaultValue: 'user' },
      { name: 'createTime', type: 'datetime' },
      { name: 'updateTime', type: 'datetime' },
      { name: 'refreshToken', type: 'text' },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes['Users'];
export type UsersRecord = Users & XataRecord;

export type DatabaseSchema = {
  Users: UsersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    'https://18maytinhmoi-s-workspace-m5c9o7.us-east-1.xata.sh/db/my-collection-app',
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
