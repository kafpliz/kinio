import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createBookmarkDTO, deleteBookmarkDTO } from './bookmarks.dto';
import { AppDataSource } from 'src/entity/connect';
import { Bookmark } from 'src/entity/user-dependencies/bookmarks';
import { User } from 'src/entity/user';
import { Movie } from 'src/entity/movie';
import { BookmarksRemake } from 'src/utils/bookmarks.remake';


@Injectable()
export class BookmarksService {
    limit: number = 20

    async getBookmark(user_id: number, type: string, page: number | null) {

        const userRepo = AppDataSource.getRepository(User)
        const bookmarkRepo = AppDataSource.getRepository(Bookmark)
        const user = await userRepo.findOne({
            where: {
                id: user_id,
            }, relations: ["bookmarks"]
        })
        if (!user) throw new HttpException('Такого пользователя не существует!', HttpStatus.NOT_FOUND)

        const conditions = {
            take: this.limit,
            skip: 0
        }

        if (page) { conditions.skip = page == 1 ? 0 : (page - 1) * this.limit }



        const bookmarkDB = await bookmarkRepo.find({
            where: {
                user: { id: user_id },
                type
            }, ...conditions
        },)
        const totalRecords = await bookmarkRepo.count({
            where: {
                user: {id: user_id},
                type
            }
        });
      
        
        const props = {
            total: totalRecords,
            page: page ? page : 1,
            pages: totalRecords <= this.limit ? 1 : Math.ceil(totalRecords / this.limit),
            count: bookmarkDB.length
        }
        const bookamrks = bookmarkDB.length == 0 ? null : await BookmarksRemake(bookmarkDB)

        return { statusCode: 200, data: bookamrks, props }
    }

    async createBookmark(data: createBookmarkDTO) {

        const filmRepo = AppDataSource.getRepository(Movie)
        const bookmarksRepo = AppDataSource.getRepository(Bookmark)
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne({ where: { id: Number(data.user_id) }, relations: ["bookmarks"] })
        const film = await filmRepo.findOneBy({ id: data.film_id })
        if (!user || !film) {
            throw new HttpException('Не найдено!', HttpStatus.BAD_REQUEST)
        }


        const candidate_bookmark = await bookmarksRepo.findOne({
            where: {
                film_id: data.film_id,
                user: {
                    id: data.user_id
                }
            }
        })



        if (candidate_bookmark) {
            candidate_bookmark.type = data.type
            await bookmarksRepo.save(candidate_bookmark)
            return { mesage: "Успешно обновлено.", status: 200 }
        } else {
            const bookmark = bookmarksRepo.create({
                film_id: data.film_id,
                type: data.type
            })
            bookmark.user = user;
            await bookmarksRepo.save(bookmark)

            user.bookmarks.push(bookmark);
            await userRepo.save(user);

        }

        return { mesage: "Успешно добавлено.", status: 200 }
    }

    async deleteBookmark(data: deleteBookmarkDTO) {
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne({ where: { id: Number(data.user_id) }, relations: ["bookmarks"] })

        const bookmarksRepo = AppDataSource.getRepository(Bookmark)
        const bookmark = await bookmarksRepo.findOne({
            where: {
                id: data.film_id
            }
        })
        if (!bookmark) throw new HttpException('Такой закладки не существует!', HttpStatus.NOT_FOUND)
        if (!user) throw new HttpException('Такой пользователя не существует!', HttpStatus.NOT_FOUND)

        await bookmarksRepo.remove(bookmark)

        user.bookmarks = user.bookmarks.filter(bookmark => bookmark.id != data.film_id)
        await userRepo.save(user)
        return { statusCode: 200, message: "Успешно удалено!" }
    }
}
