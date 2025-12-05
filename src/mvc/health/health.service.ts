import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private db: DataSource) {}

  async check() {
    try {
      await this.db.query('SELECT 1');

      return { status: 'UP' };
    } catch (err) {
      return { status: 'DOWN', error: err.message };
    }
  }
}