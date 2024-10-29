import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { TypeOrmSQLITETestingModule } from '../utils/sqlite-testing.module';
import { DepartmentsService } from './departments.service';
import { faker } from '@faker-js/faker';
import { Departments } from './departments.entity';
import { NotFoundException } from '@nestjs/common';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;

  const obj = {
    id: '5258305f-fd6a-4e8c-8619-61bc3d092561',
    name: 'Department of Computer Engineering'
  }
  const anotherId = 'f2362d66-a84f-4fe7-b19b-0f90f4bcc9be'

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [DepartmentsService],
      controllers: [DepartmentsController],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
    await controller.recordDepartment(obj)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Record Department', () => {
    it('Should record new department"', async () => {
      const name = faker.company.name()
      const d = await controller.recordDepartment({ name })
      expect(d.name).toEqual(name)
      expect(d).toBeInstanceOf(Departments)
    });
  });

  describe('List all departments', () => {
    it('Should return non-empty list', async () => {
      const d = await controller.getAllDepartments()
      expect(d.length).toBeGreaterThan(0)
    });
  });

  describe('Get department By Id', () => {
    it('Should throw not found exception when id does not exists', async () => {
      try {
        await controller.getDepartmentById(anotherId)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    });
    it('Should return department with the provided id', async () => {
      const d = await controller.getDepartmentById(obj.id)
      expect(d.id).toEqual(obj.id)
    });
  });

  describe('Get department By Name', () => {
    it('Should throw not found exception when name does not exists', async () => {
      try {
        await controller.getDepartmentByName("Depts")
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    });
    it('Should return department with the provided name', async () => {
      const d = await controller.getDepartmentByName(obj.name)
      expect(d.name).toEqual(obj.name)
    });
  });

  describe('Edit department', () => {
    it('Should throw not found exception when id does not exists', async () => {
      try {
        await controller.editDepartment({ name: obj.name }, anotherId)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    });
    it('Should return department with the new name', async () => {
      const name = faker.company.name()
      const d = await controller.editDepartment({ name }, obj.id)
      expect(d.name).toEqual(name)
    });
  });


});
