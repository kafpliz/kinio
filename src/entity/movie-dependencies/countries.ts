import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "../movie";


@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255, select:false })
    dirName: string;

    @ManyToMany(() => Movie, (movie) => movie.countries)
    movies: Movie[];

}