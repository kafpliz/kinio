import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/entity/connect';
import { Movie } from 'src/entity/movie';

@Injectable()
export class MovieService {

  async  getMovie(id:number){
        const movie = await ((AppDataSource.getRepository(Movie)).findOne({where : {id_kp: id}, relations: ['persons', 'genres'], }))
        console.log(movie);
        
        return movie
    }
}
