import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    
    constructor(private service:MovieService){}

    @Get(':id')
    getMovie(@Param('id') id, ){
        return this.service.getMovie(Number(id))
    }
}
