import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDataSource } from './entity/connect';
import { Genre } from './entity/movie-dependencies/genres';
import { Person } from './entity/person';
import { Movie } from './entity/movie';
import { join } from 'path';
import { User } from './entity/user';
import { Role } from './entity/user-dependencies/roles';
import { Type } from './entity/movie-dependencies/types';
import { Status } from './entity/movie-dependencies/status';
import { ILike, IsNull, Not } from 'typeorm';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello() {
    const repo = await AppDataSource.getRepository(Movie).find({
      where: {
        list  : Not(IsNull())
      }
    })
    console.log(repo);

    /*  const data = await fetch('https://api.alloha.tv/?token=6d5e09708e1031531a0db55104b47a&kp='+ 1282979)
     if(data.ok){
       const pasrs = await data.json()
       
       console.log(pasrs);
       
       
      return pasrs
     } */
    return repo.length
  }
}
