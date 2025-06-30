import { Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';

import { User } from 'src/entity/user';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path';
import { getUserData } from './dto/create-user';
import { loginData } from './dto/login-user';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private service: AuthService) { }

  @Post('/login')
  login(@Body() data: loginData) {
    return this.service.login(data)
  }

  @Post('/signup')
  @UseInterceptors(FileInterceptor('photo'))
  async signUp(@Body() data: getUserData, @UploadedFile() file: Express.Multer.File) {
    console.log(data);
    
    if (!data.email) throw new HttpException('Поле email не может быть пустым или отсутствовать.', HttpStatus.BAD_REQUEST)


    if (file) {
      const webpBuffer = await sharp(file.buffer).webp({ quality: 100 }).toBuffer()
      const uploadPath = path.join(__dirname, '../../../', 'uploads', `${Math.floor(Date.now() / 1000)}.webp`)
      fs.writeFileSync(uploadPath, webpBuffer)
      data.photoUrl = 'uploads' + (uploadPath.replace(/\\/g, '/').split('uploads')[1])
    }

    return this.service.signUp(data)
  }
  @UseGuards(AuthGuard)
  @Get('/islogin')
  isLogin(){
    return {}
  }
}

