import { DataSource } from "typeorm";
import { Movie } from "./movie";
import { Person } from "./person";
import { Genre } from "./movie-dependencies/genres";
import { User } from "./user";
import { Role } from "./user-dependencies/roles";
import { Bookmark } from "./user-dependencies/bookmarks";
import { Type } from "./movie-dependencies/types";
import { Status } from "./movie-dependencies/status";
import { Country } from "./movie-dependencies/countries";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "kafpliz",
    database: "kinio",
    entities: [Movie, Person, Genre, User, Role, Bookmark, Type, Status, Country],
    synchronize: true,
    logging: false,
});


AppDataSource.initialize().then(data => {
    console.log('подключено 4');

}).catch((err) => {
    console.log(err);
    console.log('ошибка');

})

