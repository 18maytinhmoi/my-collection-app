import { Migration } from '@mikro-orm/migrations';

export class Migration20221216030031 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "create_at" timestamptz(0) not null default current_timestamp, "update_at" timestamptz(0) not null default current_timestamp, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "email" varchar(255) not null, "refresh_token" varchar(255) null, "role" text check ("role" in (\'user\', \'admin\')) not null default \'user\');');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

}
