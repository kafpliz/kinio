import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "./movie";


@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer" })
    kp_id: string;

    @Column({ type: "varchar", length: 255, nullable:true })
    name: string;
    @Column({ type: "varchar", length: 255, nullable:true })
    enName: string;

    @Column({ type: "varchar", length: 255 })
    img: string;
    @Column({ type: "date", nullable: true, default: null })
    date_start: string| null;
    @Column({ type: "date", nullable: true, default: null })
    date_end: string| null;

    @Column({ type: "integer", nullable: true, default: null })
    age: number| null;

    @Column({ type: "varchar", nullable: true, default: null })
    birthPlace: string| null;
    @Column({ type: "varchar", nullable: true, default: null })
    deathPlace: string| null;

    
    @Column({ type: "text", nullable: true, default: null, array: true })
    profession: string []| null;

    @ManyToMany(() => Movie, (movie) => movie.persons)
    movies: Movie[];


    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date; 
  
    @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}