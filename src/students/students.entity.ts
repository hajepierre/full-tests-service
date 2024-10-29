import { Departments } from "../departments/departments.entity";
import { Base } from "../shared/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Students extends Base {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    gender: string

    @Column()
    dateOfBirth: string

    @ManyToOne(() => Departments, (d) => d.students)
    department:Departments
}