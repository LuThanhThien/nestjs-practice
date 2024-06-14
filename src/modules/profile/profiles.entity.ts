import { User } from "../users/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Profile  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  signature: string;

  @Column()
  bio: string;

  @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  user: User;
}