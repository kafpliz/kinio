import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/entity/connect';
import { User } from 'src/entity/user';
import { omit } from "lodash";
import { userDTO } from './user.dto';
import { BookmarksRemake } from 'src/utils/bookmarks.remake';
@Injectable()
export class UserService {

    async getUser(id:number){
        const userRepo = AppDataSource.getRepository(User)
        const noFilterUser = await userRepo.findOne({where: {
          /*   public: true, */
            id: id
        }, relations: ['bookmarks', 'roles']})
        const user:any = omit(noFilterUser, ["access", "refresh", "public", "updatedAt", "confirmCode", "confirm", "password"])
        user.bookmarks = await BookmarksRemake(user.bookmarks)
        
        return user
    }


}
