import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { domain } from 'src/config';
import { AppDataSource } from 'src/entity/connect';
import { User } from 'src/entity/user';
import { BookmarksRemake } from 'src/utils/bookmarks.remake';
import { editProfileDTO, updateProfileDTO } from './profile.dto';

@Injectable()
export class ProfileService {

    async getData(userId: number) {
        const user_repo = AppDataSource.getRepository(User)
        const user = omit(await user_repo.findOne({
            where: { id: userId }, relations: ['bookmarks', 'roles'],
            select: {
                roles: {
                    id: false,
                    name: true,
                },
            }
        }), ['confirm', 'confirmCode', 'public', 'updatedAt', 'password'])
        const filterUser:any = omit(user, ['bookmarks'])

        filterUser.bookmarks = await BookmarksRemake(user.bookmarks || [])
        filterUser.photo = domain + user.photo

        return filterUser
    }

    async editPtofile(data:updateProfileDTO, user_data:{id:number, email:string, access?:string}){
       
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne({where: {
            id: user_data.id
        }})
        console.log(data);
        
        if(user) {
            userRepo.update(user_data.id, data)
        }

        return { statusCode: 200, message: 'Успешно обновлено!'}
       

        
    }
}
