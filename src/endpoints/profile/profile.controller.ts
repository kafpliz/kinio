import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProfileService } from './profile.service';
import { editProfileDTO } from './profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp'
import { writeFileSync } from 'fs';
import { join } from 'path';

@Controller('profile')
export class ProfileController {

    constructor(private service: ProfileService) { }

    @UseGuards(AuthGuard)
    @Get('')
    async getProfile(@Req() req: Request) {
        return this.service.getData(req['user'].id)
    }

    @UseGuards(AuthGuard)
    @Post('')
    @UseInterceptors(FileInterceptor('photo'))
    async editProfile(@Body() data: editProfileDTO, @Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        const valid = Object.values(data).every(value => value === undefined)
        if(valid) throw new HttpException('Все поля не могут быть пустыми', HttpStatus.BAD_REQUEST)


        const info: any = { ...data }
        const hasPublic = !data.public ? undefined : data.public == 'true' ? true : false;
        if (hasPublic != undefined) info.public = hasPublic

        if (file) {
            const webpBuffer = await sharp(file.buffer).webp({ quality: 100 }).toBuffer()
            const uploadPath = join(__dirname, '../../../', 'uploads', `${Math.floor(Date.now() / 1000)}.webp`)
            writeFileSync(uploadPath, webpBuffer)
            info.photo = 'uploads' + (uploadPath.replace(/\\/g, '/').split('uploads')[1])

        }
        console.log(data);
        
        return this.service.editPtofile(info, { ...req['user'] })
    }


}
