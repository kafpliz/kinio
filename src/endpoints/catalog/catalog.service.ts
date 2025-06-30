import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/entity/connect';
import { Movie } from 'src/entity/movie';
import { OrderType, SortOption, SortOptionArr, StatusArr, StatusType } from './catalog.types';
import { Between } from 'typeorm';


@Injectable()
export class CatalogService {
    limit: number = 50
    select: string[] = ["movie.name", "movie.altName", "movie.id", "genre.name", "genre.id", "movie.relesed", "movie.type", "movie.rating", "movie.status", "movie.ageRating", "movie.poster","type.name", "type.id",]


    async getCatalog(sort_q: SortOption, year: string[], status: StatusType, rating: string[], genreNames: string[], page: number | null, type:string) {
        const sort = SortOptionArr.includes(sort_q) ? sort_q : null
        const orderSide = sort == null ? null : sort.includes('-') ? 'DESC' : 'ASC'

        let order = {};
        const conditions = {
            take: this.limit,
            skip: 0
        }

        if (page) { conditions.skip = page == 1 ? 0 : (page - 1) * this.limit }

        if (sort) {
            order[sort.replace('-', '')] = orderSide
        }

        const queryBuilder = AppDataSource.getRepository(Movie).createQueryBuilder('movie').leftJoinAndSelect('movie.genres', 'genre').leftJoinAndSelect('movie.type', 'type')
            .take(conditions.take).skip(conditions.skip).select(this.select)


        if (status && StatusArr.includes(status)) {
            queryBuilder.andWhere('movie.status = :status', { status })
        }

        if (year && year.length == 2) {
            queryBuilder.andWhere('movie.relesed BETWEEN :yearStart AND :yearEnd', { yearStart: year[0], yearEnd: year[1] })

        } else if (year && year.length == 1) {
            queryBuilder.andWhere('movie.relesed = :year', { year: year[0] })
        }


        if (rating && rating.length == 2) {
            queryBuilder.andWhere('movie.rating BETWEEN :ratingStart AND :ratingEnd', { ratingStart: Number(rating[0]), ratingEnd: Number(rating[1]) })

        } else if (rating && rating.length == 1) {
            const rat_start = Number(rating[0]) < 1.5 ? Number(rating[0]) - 0.5 : Number(rating[0])
            const rat_end = Number(rating[0]) > 9.5 ? Number(rating[1]) + 0.5 : Number(rating[1])
            queryBuilder.andWhere('movie.rating BETWEEN :start AND :end', { start: rat_start, end: rat_end })

        }
        if (genreNames && genreNames[0].length != 0) {
            queryBuilder.andWhere('genre.name IN (:...genreNames)', { genreNames })
        }

        if(type){
            queryBuilder.andWhere('type.enName = :type', { type })
        }

        if (Object.keys(order).length > 0) {
            Object.entries(order).forEach(([key, value]: any) => {
                const ord: OrderType = value
                queryBuilder.addOrderBy(`movie.${key}`, ord, 'NULLS LAST')
            })
        }


        const catalog = await queryBuilder.getMany()
        const totalRecords = await queryBuilder.getCount()

        catalog.forEach(movie=> {
            movie.rating = typeof movie.rating == "string" ? parseFloat(movie.rating) : movie.rating
        })
        const props = {
            total: totalRecords,
            page: page ? page : 1,
            pages: totalRecords <= this.limit ? 1 : Math.ceil(totalRecords / this.limit),
            count: catalog.length
        }
        return { statusCode: 200, data: catalog, props }
    }
}
