import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmSQLITETestingModule } from '../src/utils/sqlite-testing.module';
import { DepartmentsController } from '../src/departments/departments.controller';
import { DepartmentsService } from '../src/departments';
import { faker } from '@faker-js/faker/.';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    const obj = {
        id: '5258305f-fd6a-4e8c-8619-61bc3d092561',
        name: 'Department of Computer Engineering'
    }
    const unknowId = 'f2362d66-a84f-4fe7-b19b-0f90f4bcc9be'

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            controllers: [DepartmentsController],
            providers: [DepartmentsService],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        // Seed data
        await request(app.getHttpServer())
            .post('/departments').send(obj)
    });


    describe('Record department', () => {
        it('/departments (POST) should record new department', async () => {
            const name = faker.company.name()
            const resp = await request(app.getHttpServer())
                .post('/departments').send({ name })
            expect(resp.body.id).not.toBeNull()
            expect(resp.body.name).toEqual(name)
        });
    })

    describe('List departments', () => {
        it('/departments (GET) should return a list of departments ', async () => {
            const resp = await request(app.getHttpServer())
                .get('/departments').expect(200)
            expect(resp.body.length).toBeGreaterThan(0)
        });
    })

    describe('Get Department By Id', () => {
        it('/departments/:id (GET) should throw 404 with non-existing id', () => {
            request(app.getHttpServer()).get(`/departments/${unknowId}`).expect(404)
        });

        it('/departments/:id (GET) should return department when id exists', async () => {
            const resp = await request(app.getHttpServer())
                .get(`/departments/${obj.id}`).expect(200)
            expect(resp.body.id).toEqual(obj.id)
        });
    })

    describe('Get Department By Name', () => {
        it('/departments/names/:name (GET) should throw 404 with non-existing name', () => {
            request(app.getHttpServer()).get('/departments/names/depts').expect(404)
        });

        it('/departments/names/:names (GET) should return department when name exists', async () => {
            const resp = await request(app.getHttpServer())
                .get(`/departments/names/${obj.name}`).expect(200)
            expect(resp.body.name).toEqual(obj.name)
        });
    })

    describe('Update Department Name', () => {
        const name = faker.company.name()
        it('/departments/:id (PATCH) should throw 404 with non-existing name', () => {
            request(app.getHttpServer()).patch(`/departments/${unknowId}`).send({ name }).expect(404)
        });

        it('/departments/:id  (PATCH) should return department with new name when id exists', async () => {
            const resp = await request(app.getHttpServer()).patch(`/departments/${obj.id}`).send({ name }).expect(200)
            expect(resp.body.name).toEqual(name)
        });
    })

    afterAll(() => { 
        app.close()
    })
});
