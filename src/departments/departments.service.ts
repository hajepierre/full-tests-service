import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departments } from '.';
import { Repository } from 'typeorm';
import { CreateDeparmentDto } from './dtos/departments.dto';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Departments)
        private readonly r: Repository<Departments>,
    ) { }

    async add({ id, name }: CreateDeparmentDto) {
        const temp = await this.findByName(name)
        if (temp)
            throw new ConflictException(`Another department with name ${name} already exists in the system`)
        const entity = this.r.create({ id, name })
        return this.r.save(entity)
    }

    async edit(id: string, name: string) {
        const temp = await this.findById(id)
        if (!temp)
            throw new NotFoundException(`No department with id ${id} was found in the system`)
        await this.r.update({ id }, { name })
        return await this.findById(id)
    }

    async findAll() {
        return this.r.find()
    }

    async findByName(name: string) {
        return this.r.findOne({ where: { name } })
    }

    async findById(id: string) {
        return this.r.findOne({ where: { id } })
    }
}
