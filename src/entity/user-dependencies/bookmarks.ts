import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm";
import { User } from "../user";


@Entity()

export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    type: string;

    @Column({ type: "integer" })
    film_id: number;

    @ManyToOne(()=> User, (user)=> user.bookmarks)
    user:User;

}