import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { searchDTO } from './search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    types = ['user', 'movie', 'person']

    constructor(private service:SearchService){}

    @Get()
    async search(@Query('type') type:string, @Query('q') q:string, @Query('page') page:string){
        if(!this.types.includes(type)) throw new HttpException('Не выбран тип поиска', HttpStatus.BAD_REQUEST)
        const page_num =  page ? Number(page) : null
        
        
        return  this.service.getData(q, type, page_num)
    }
}
