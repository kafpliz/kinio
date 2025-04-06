import { DataSource } from "typeorm";
import { Movie } from "./movie";
import { Person } from "./person";
import { Genre } from "./genres";
import { User } from "./user";
import { Role } from "./roles";
import { Bookmark } from "./bookmarks";
import { Type } from "./types";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "kafpliz",
    database: "kinio",
    entities: [Movie, Person, Genre, User, Role, Bookmark, Type],
    synchronize: true,
    logging: false,
});


AppDataSource.initialize().then(data => {
    console.log('подключено 4');

}).catch((err) => {
    console.log(err);
    console.log('ошибка');

})

