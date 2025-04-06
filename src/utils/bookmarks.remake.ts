import { AppDataSource } from "src/entity/connect";
import { Movie } from "src/entity/movie";

export async function BookmarksRemake(data: { film_id: number, type: string }[]): Promise<Movie[]> {
    const filmRepo = AppDataSource.getRepository(Movie)
    const resultFilm: Movie[] = []

    for (const item of data) {
        const film: any = await filmRepo.findOne({ where: { id: item.film_id }, relations: ["genres"], select: ["id", "poster", "name", "ageRating", "rating", "altName"] })
        film.bookmark_type = item.type
        if (film) resultFilm.push(film)
    }


    return resultFilm
}