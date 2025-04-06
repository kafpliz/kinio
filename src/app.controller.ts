import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDataSource } from './entity/connect';
import { Genre } from './entity/genres';
import { Person } from './entity/person';
import { Movie } from './entity/movie';
import { join } from 'path';
import { User } from './entity/user';
import { Role } from './entity/roles';
import { Type } from './entity/types';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello() {
    const repo = AppDataSource.getRepository(Movie)
    const url = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=50&selectFields=id&selectFields=name&selectFields=alternativeName&selectFields=names&selectFields=description&selectFields=slogan&selectFields=type&selectFields=status&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=votes&selectFields=movieLength&selectFields=seriesLength&selectFields=genres&selectFields=poster&selectFields=backdrop&selectFields=persons&sortField=rating.kp&sortField=votes.kp&sortType=-1&sortType=-1'

    /*     const ValuesUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name' */
    /* const TypeUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=type' */




    const data = await fetch(url, {
      headers: {
        'X-API-KEY': 'AY6MD0Z-F9HM2Q7-PRS9W4F-B44DYD4'
      }
    })
/*     if (data.ok) {
      const pars = await data.json()
      const typeRepo = AppDataSource.getRepository(Type)

      for (const movie of pars.docs) {
        const movie_repo = AppDataSource.getRepository(Movie)

        const gen_mov = new Movie()
        gen_mov.altName = movie.alternativeName
        gen_mov.ageRating = movie.ageRating
        gen_mov.movieLength = movie.movieLength
        gen_mov.seriesLength = movie.seriesLength
        gen_mov.status = movie.status
        gen_mov.slogan = movie.slogan
        gen_mov.description = movie.description
        gen_mov.relesed = movie.year

        gen_mov.name = movie.name
        gen_mov.id_kp = movie.id
        gen_mov.rating = movie.rating.kp
        gen_mov.votes = movie.votes.kp
        gen_mov.backdrop = null
        gen_mov.poster = movie.poster.url
        gen_mov.rating_kinio = null
        gen_mov.votes_kinio = null
        gen_mov.persons = []
        gen_mov.genres = []

        for (const item of movie.persons) {
          const personRepository = AppDataSource.getRepository(Person);
          let person = await personRepository.findOne({ where: { name: item.name }, relations: ["movies"], },)
          if (!person) {
            person = new Person()
            person.name = item.name
            person.enName = item.enName
            person.img = item.photo
            person.kp_id = item.id
            person.movies = [];
          }
          if (!person.movies.some((m) => m.id === gen_mov.id)) {
            person.movies.push(gen_mov);
          }

          if (!gen_mov.persons.some((p) => p.name === person.name)) {
            gen_mov.persons.push(person)
          }
          await personRepository.save(person);
        }

        for (const item of movie.genres) {
          const genreRepo = AppDataSource.getRepository(Genre)
          let genre = await genreRepo.findOne({ where: { name: item.name }, relations: ['movies'] })
          if (!genre) {
            genre = new Genre()
            genre.name = item.name
            genre.movies = []
            console.log('жанра нету');

          }

          if (!gen_mov.genres.some((g) => g.name === genre.name)) {
            gen_mov.genres.push(genre)
          }
          if (!genre.movies.some((m) => m.id === gen_mov.id)) {
            genre.movies.push(gen_mov);
          }

          await genreRepo.save(genre)

        }
        let types = await typeRepo.findOne({ where: { enName: movie.type } ,relations: ['movies']})
        if (!types) {
          types = new Type()
          types.name = movie.type
          types.movies = []
          console.log('жанра нету');
        }
        if (!types.movies.some((movie_ty) => movie_ty.id === gen_mov.id)) {
          types.movies.push(gen_mov)
        }
        gen_mov.type = types
        await typeRepo.save(types)

        await movie_repo.save(gen_mov);
      }




    } */
    return repo.find({})
  }
}
