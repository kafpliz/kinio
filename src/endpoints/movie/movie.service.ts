import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/entity/connect';
import { Movie } from 'src/entity/movie';
import { getDataKpDev, getDataUnDev, IData } from 'src/utils/fetch';

@Injectable()
export class MovieService {

  async getMovie(id: number) {
    /*   const movie = await AppDataSource.getRepository(Movie).createQueryBuilder("movie")
        .leftJoinAndSelect("movie.status", "status")
        .leftJoinAndSelect("movie.genres", "genres")
        .leftJoinAndSelect("movie.persons", "persons")
        .leftJoinAndSelect("movie.countries", "countries")
        .leftJoinAndSelect("movie.type", "type").select(["movie", "status.name", "type.name", "persons.name", "persons.id", "persons.img", "genres", "countries.id", "countries.name"]).where("movie.id = :id", { id }).getOne()
        const {id_kp, id_tmdb, id_imdb, ...responceToClient}:any = movie  
      if (movie) {
        movie.rating = typeof movie.rating == "string" ? parseFloat(movie.rating) : movie.rating
        movie.viewsPage =  movie.viewsPage + 1;
        await AppDataSource.getRepository(Movie).update({ id: id }, { viewsPage: movie.viewsPage })
        console.log(movie.id_kp);
        
     
      } */
    let data: any = {}

    const kp_dev = await getDataKpDev(id);
    if (kp_dev == null) {
      const un_dev = await getDataUnDev(id)
      if (un_dev != null) data = { ...un_dev }

    } else {
      data = { ...kp_dev }
    }

    const alloha = await fetch(`https://api.alloha.tv/?token=${process.env.alloha}&kp=` + id)
    if (alloha.ok) {
      const pasrs = await alloha.json()
      console.log(pasrs);

      data.link = pasrs.data?.iframe
    }

    return data
  }
}
