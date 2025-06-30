import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BookmarkDTO, deleteBookmarkDTO, } from './bookmarks.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { BookmarksService } from './bookmarks.service';
import { Request } from 'express';

@Controller('bookmarks')
export class BookmarksController {
    typeArr:string[] = ['watching', "planned", "watched", "cast"]
    constructor(private service:BookmarksService){}

    @Get('')
    async getBookamrk(@Query('user_id') user_id:string, @Query('type') type:string, @Query('page') page:string){
        const page_num =  page ? Number(page) : null
        if(!Number(user_id) || !this.typeArr.includes(type)){
            throw new HttpException('Не выполнены обязательные условия!', HttpStatus.BAD_REQUEST)
        }
       return this.service.getBookmark(Number(user_id), type, page_num)
        
    }

    @UseGuards(AuthGuard)
    @Post('')
    async addBookmark(@Body() data:BookmarkDTO, @Req() req:Request){
        const info = {...data, user_id: req['user'].id}
        console.log(data);
        
        return this.service.createBookmark(info)
    }

    @UseGuards(AuthGuard)
    @Delete('')
    async deleteBookmark(@Body() data:deleteBookmarkDTO, @Req() req:Request){
        const info = {...data, user_id: req['user'].id}
        return this.service.deleteBookmark(info)

    }
}
