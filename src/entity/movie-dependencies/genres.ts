import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,Unique } from "typeorm";
import { Movie } from "../movie";


@Entity()
@Unique(["name"])
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @ManyToMany(() => Movie, (movie) => movie.genres)
    movies: Movie[];

}