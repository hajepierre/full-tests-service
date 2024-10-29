import { TypeOrmModule } from '@nestjs/typeorm';
import { Departments } from '../departments';
import { Students } from '../students';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [Departments, Students],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Departments, Students]),
];