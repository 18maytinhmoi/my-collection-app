import { Injectable } from '@nestjs/common';
import { getXataClient } from './xata';

@Injectable()
export class AppService {
  async getHello() {
    const xata = getXataClient();
    const i = await xata.db.Users.getAll();
    return i;
  }
}
