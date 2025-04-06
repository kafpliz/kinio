import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Person } from "./person";
import { Genre } from "./genres";
import { Type } from "./types";


@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "integer", nullable: true })
    id_kp: number

    @Column({ type: "text", nullable: true })
    name: string

    @Column({ type: "text", nullable: true })
    altName: string

    @Column({ type: "text", nullable: true })
    description: string

    @Column({ type: "text", nullable: true })
    relesed: string
   

    @Column({ type: "decimal",  nullable: true, precision: 5, scale:3 })
    rating: number

    @Column({ type: "decimal",  nullable: true, precision: 5, scale:3 })
    rating_kinio: number | null

    @Column({ type: "integer", nullable: true })
    votes_kinio: number | null

    @Column({ type: "integer", nullable: true })
    votes: number


    @Column({ type: "varchar", nullable: true })
    status: string

    @Column({ type: "varchar", nullable: true })
    slogan: string

    @Column({ type: "varchar", nullable: true })
    movieLength: number

    @Column({ type: "varchar", nullable: true })
    seriesLength: number

    @Column({ type: "varchar", nullable: true })
    ageRating: number

   @Column({ type: "text", nullable: true })
   poster: string

    @Column({ type: "text", nullable: true })
    backdrop: string | null


    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date; 
  
    @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;



    @ManyToMany(() => Person, (person) => person.movies )
    @JoinTable()
    persons: Person[]


    @ManyToMany(() => Genre, (genre) => genre.movies)
    @JoinTable()
    genres: Genre[]


    @ManyToOne(()=> Type, (type)=> type.movies)
    type: Type;
}