import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(private service:UserService){}

    @Get(':user')
    getUser(@Param('user') user_id){    
        if(!Number(user_id)) return {message: 'ID пользователя обязательный параметр!', status: 401}
        return  this.service.getUser(Number(user_id))
    }

 
}
