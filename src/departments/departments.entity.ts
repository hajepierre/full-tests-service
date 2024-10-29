import { Base } from "../shared/base.entity";
import { Students } from "../students/students.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Departments extends Base {
    @Column({ unique: true, length: 100 })
    name: string

    @OneToMany(() => Students, (s) => s.department)
    students:Students
}