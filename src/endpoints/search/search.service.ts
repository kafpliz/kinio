import { Injectable } from '@nestjs/common';
import { domain } from 'src/config';
import { AppDataSource } from 'src/entity/connect';
import { Movie } from 'src/entity/movie';
import { Person } from 'src/entity/person';
import { User } from 'src/entity/user';
import { Brackets } from 'typeorm';

@Injectable()
export class SearchService {
    limit = 30
    skip = 0;


    async getData(q: string, type: string, page: number | null) {
        const responce: {
            statusCode: number,
            data: User[] | Person[] | Movie[],
            props: {
                count: number,
                total: number,
                page: number,
                pages: number
            }
        } = {
            statusCode: 200,
            data: [],
            props: {
                count: 0,
                total: 0,
                page: 1,
                pages: 1
            }
        }
        if (page) this.skip = page == 1 ? 0 : (page - 1) * this.limit

        if (type == "user") {
            const user = AppDataSource.getRepository(User).createQueryBuilder("user").take(this.limit).skip(this.skip).select(['user.photo', 'user.id', 'user.lastName', 'user.name', 'user.description'])
            const dataUser = await user.where("user.name ILIKE :q", { q: `${q}%` }).getMany()
            const totalRecords = await user.where("user.name ILIKE :q", { q: `${q}%` }).getCount()
            dataUser.forEach(data=> {
                data.photo = domain + data.photo
            })
            responce.data = dataUser
            responce.props.count = dataUser.length
            responce.props.total = totalRecords
            responce.props.page = page ? page : 1
            responce.props.pages = totalRecords <= this.limit ? 1 : Math.ceil(totalRecords / this.limit)

        } else if (type == "movie") {
            const repoMovie = AppDataSource.getRepository(Movie).createQueryBuilder('movie').take(this.limit).skip(this.skip)
            .leftJoinAndSelect('movie.genres', 'genre').leftJoinAndSelect('movie.type', 'type')
            .select(["movie.id","movie.name", 'movie.altName', 'movie.poster', 'movie.rating', "movie.type", 'type.name', 'genre',])
            const query = q.toLowerCase().replaceAll(/[^a-zA-Zа-яА-Я0-9]/g, '')

            const dataMovie = await repoMovie.where(new Brackets(qb => {
                qb.where(`LOWER(movie.dirName) ILIKE :query`, { query: `%${query}%` })
                    .orWhere(`LOWER(movie.dirAltName) ILIKE :query`, { query: `%${query}%` });
            })).getMany()
            dataMovie.forEach(data=> {
                if (typeof data.rating === "string") {
                    data.rating = parseFloat(data.rating);
                }
            })
            
            const totalRecords = await repoMovie.where(new Brackets(qb => {
                qb.where(`LOWER(movie.dirName) ILIKE :query`, { query: `%${query}%` })
                .orWhere(`LOWER(movie.dirAltName) ILIKE :query`, { query: `%${query}%` });
            })).getCount()
      

            responce.data = dataMovie    
            responce.props.count =  dataMovie.length
            responce.props.total = totalRecords
            responce.props.page = page ? page : 1
            responce.props.pages = totalRecords <= this.limit ? 1 : Math.ceil(totalRecords / this.limit)


        } else {
            const person = AppDataSource.getRepository(Person).createQueryBuilder("person").take(this.limit).skip(this.skip).select(['person.id', "person.name", 'person.enName', 'person.img', 'person.profession'])
            const dataPerson = await person.where("person.name ILIKE :q OR person.enName ILIKE :q", { q: `${q}%` }).getMany()
            const totalRecords = await person.where("person.name ILIKE :q OR person.enName ILIKE :q", { q: `${q}%` }).getCount()

            responce.data = dataPerson
            responce.props.count = dataPerson.length
            responce.props.total = totalRecords
            responce.props.page = page ? page : 1
            responce.props.pages = totalRecords <= this.limit ? 1 : Math.ceil(totalRecords / this.limit)
        }


        return responce
    }
}


