import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/entity/connect';
import { Movie } from 'src/entity/movie';

@Injectable()
export class MovieService {

  async getMovie(id: number) {
    const movie = await AppDataSource.getRepository(Movie).createQueryBuilder("movie")
      .leftJoinAndSelect("movie.status", "status")
      .leftJoinAndSelect("movie.genres", "genres")
      .leftJoinAndSelect("movie.persons", "persons")
      .leftJoinAndSelect("movie.type", "type").select(["movie", "status.name", "type.name", "persons.name","persons.id","persons.img", "genres"]).where("movie.id = :id", { id }).getOne()

    console.log(movie);

    return movie
  }
}
