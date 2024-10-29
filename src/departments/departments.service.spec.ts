import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';
import { TypeOrmSQLITETestingModule } from '../utils/sqlite-testing.module';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('DepartmentsService', () => {
  let service: DepartmentsService;

  const obj = {
    id: '5258305f-fd6a-4e8c-8619-61bc3d092561',
    name: 'Department of Computer Engineering'
  }
  const anotherId = 'f2362d66-a84f-4fe7-b19b-0f90f4bcc9be'

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [DepartmentsService],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    await service.add(obj)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create new Department', () => {
    it('Should report new department', async () => {
      const name = faker.company.name()
      const d = await service.add({ name })
      expect(d).not.toBeNull()
      expect(d.name).toEqual(name)
      expect(d.id).not.toBeNull()
    });
  })

  describe('List departments', () => {
    it('Should return a list of all departments', async () => {
      const d = await service.findAll()
      expect(d.length).toBeGreaterThan(0)
    });
  })

  describe('Retrieve department  by ID', () => {
    it('Should return null value when id does not exists', async () => {
      const d = await service.findById(anotherId)
      expect(d).toBeNull()
    });
    it('Should return an instance of Department when Id exists', async () => {
      const d = await service.findById(obj.id)
      expect(d).not.toBeNull()
      expect(d.id).toEqual(obj.id)
    });
  })

  describe('Retrieve department by Name', () => {
    it('Should return null value when name does not exists', async () => {
      const d = await service.findByName("Fake Department")
      expect(d).toBeNull()
    });
    it('Should return an instance of Department when name exists', async () => {
      const d = await service.findByName(obj.name)
      expect(d).not.toBeNull()
      expect(d.name).toEqual(obj.name)
    });
  })

  describe('Update department with unknown Id', () => {
    it('Should return Not Found Exception', async () => {
      const name = faker.company.name()
      try {
        await service.edit(anotherId, name)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    });
  })

  describe('Update department', () => {
    it('Should be updated successfully', async () => {
      const name = faker.company.name()
      const d = await service.edit(obj.id, name)
      expect(d).not.toBeNull()
      expect(d.name).toEqual(name)
    });
  })
});
