import { Profile } from "../profile/profiles.entity";
import { Column, Entity, Exclusion, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./enum/role.enum";
import { BaseModel } from "src/@core/entity/base.entity";


@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  role: Role = Role.USER;

  @Column()  
  password: string; 

  @OneToOne(() => Profile, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: "profile_id" })
  profile: Profile = new Profile();

}