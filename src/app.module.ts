import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [DepartmentsModule, StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
