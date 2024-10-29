import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateDeparmentDto, Departments, DepartmentsService, UpdateDeparmentDto } from '.';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly s: DepartmentsService) { }

    @Post()
    async recordDepartment(@Body() dto: CreateDeparmentDto): Promise<Departments> {
        return await this.s.add(dto)
    }

    @Get()
    async getAllDepartments(): Promise<Departments[]> {
        return await this.s.findAll()
    }

    @Get(':id')
    async getDepartmentById(@Param('id') id: string): Promise<Departments> {
        const d = await this.s.findById(id)
        if (!d)
            throw new NotFoundException(`No department with Id ${id} was found`)
        return d
    }
    @Get('names/:name')
    async getDepartmentByName(@Param('name') name: string): Promise<Departments> {
        const d = await this.s.findByName(name)
        if (!d)
            throw new NotFoundException(`No department with name ${name} was found`)
        return d
    }

    @Patch(':id')
    async editDepartment(@Body() dto: UpdateDeparmentDto, @Param('id') id: string): Promise<Departments> {
        return await this.s.edit(id, dto.name)
    }
}
