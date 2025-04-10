import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "../user";



@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;
   
    @ManyToMany(() => User, (User) => User.roles)
    users: User[];

}