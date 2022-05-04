import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'plantala',
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'file',
};

export = config;
