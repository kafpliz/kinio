import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, UpdateDateColumn } from "typeorm";
import { Person } from "./person";
import { Genre } from "./movie-dependencies/genres";
import { Type } from "./movie-dependencies/types";
import { Status } from "./movie-dependencies/status";
import { Country } from "./movie-dependencies/countries";


@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "integer", nullable: true, })
    id_kp: number
    
    @Column({ type: "integer", nullable: true })
    id_tmdb: number

    @Column({ type: "varchar", nullable: true })
    id_imdb: number

    @Column({ type: "text", nullable: true })
    name: string

    @Column({ type: "text", nullable: true })
    altName: string

    @Column({ type: "text", nullable: true, select: false })
    dirName: string

    @Column({ type: "text", nullable: true, select: false })
    dirAltName: string


    @Column({ type: "text", nullable: true })
    description: string

    @Column({ type: "integer", nullable: true })
    relesed: number


    @Column({ type: "decimal", nullable: true, precision: 5, scale: 3 })
    rating: string | number

    @Column({ type: "decimal", nullable: true, precision: 5, scale: 3, select: false })
    rating_kinio: number | null

    @Column({ type: "integer", nullable: true, select: false })
    votes_kinio: number | null

    @Column({ type: "integer", nullable: true })
    votes: number



    @Column({ type: "varchar", nullable: true })
    slogan: string

    @Column({ type: "integer", nullable: true })
    movieLength: number

    @Column({ type: "integer", nullable: true })
    seriesLength: number

    @Column({ type: "integer", nullable: true })
    ageRating: number

    @Column({ type: "text", nullable: true })
    poster: string

    @Column({ type: "text", nullable: true })
    backdrop: string | null


    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", select: false })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP", select: false })
    updatedAt: Date;



    @ManyToMany(() => Person, (person) => person.movies)
    @JoinTable()
    persons: Person[]


    @ManyToMany(() => Genre, (genre) => genre.movies)
    @JoinTable()
    genres: Genre[]


    @ManyToOne(() => Type, (type) => type.movies)
    type: Type;

    @ManyToOne(() => Status, (status) => status.movies, { nullable: true })
    status: Status | null

    @Column({ type: "varchar", nullable: true, select: false })
    listSlug: string

    @Column({ type: "varchar", nullable: true, })
    list: string
    @Column({ type: "integer", default: 0 })
    viewsPage: number

    @ManyToMany(() => Country, (country) => country.movies,)
    @JoinTable()
    countries: Country[]
}