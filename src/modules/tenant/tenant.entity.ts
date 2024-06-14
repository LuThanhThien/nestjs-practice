
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "src/@core/entity/base.entity";

@Entity()
export class Tenant extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    phone: string;
    
    @Column()
    subcriptionStartDate: Date = new Date();

    @Column()
    subcriptionEndDate: Date;

}