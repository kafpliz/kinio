import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Role } from "./user-dependencies/roles";
import { Bookmark } from "./user-dependencies/bookmarks";




@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;
    @Column({ type: "varchar", length: 255 })
    lastName: string;
    @Column({ type: "varchar", length: 255 })
    email: string;
    @Column({ type: "varchar", length: 255 })
    password: string;
    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "varchar", length: 255, nullable: true, default: null })
    photo: string;

    @Column({ type: "boolean", default: false })
    confirm: boolean;

    @Column({ type: "integer", default: null, nullable: true })
    confirmCode: number;

    @Column({ type: "boolean", default: true })
    public: boolean;


    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];


    @OneToMany(()=> Bookmark, (bookmark)=> bookmark.user)
    bookmarks:Bookmark[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

 
}