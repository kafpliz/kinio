import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Movie } from "../movie";


@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", nullable: true })
    enName: string
    @Column({ type: "varchar", nullable: true })
    name: string
    @OneToMany(() => Movie, (movie) => movie.type)
    movies: Movie[]
}