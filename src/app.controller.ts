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
import { ILike } from 'typeorm';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello() {
   
  }
}
