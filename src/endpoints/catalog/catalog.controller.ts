import { Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {

    constructor(private service:CatalogService){}

    @Get('')
    async getCatalog(@Query('sort') sort, @Query('rating') rating_q:string, @Query('genre') genres_q:string, @Query('year') year_q:string, @Query('status') status_q, @Query('page') page:string, @Query('type') type:string )  { 
        // возраст
        const year = year_q?.split('-')
        const rating = rating_q?.split('-')
        const page_num =  page ? Number(page) : null
        const genres = genres_q?.split(',')

        console.log(sort);
        
        
        return this.service.getCatalog(typeof sort == 'object' ? sort[0] : sort, year, status_q, rating, genres, page_num, type) 
    }
}
