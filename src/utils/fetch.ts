export interface IData {
    name: string
    altName: string
    description: string
    relesed: string
    rating: number | null
    votes: number | null
    slogan: string | null
    movieLength: number | null
    seriesLength: number | null
    ageRating: number | null
    poster: string | null
    backdrop: string | null
    persons: {
        id: number
        name: string
        img: string
        photo: string
    }[] | null
    genres: { name: string, id?: number }[]
    type: { name: string | null }
    status: { name: string | null } | null
    list?: string | null;
    countries?: { name: string, id?: number }[]
    link?: string
    error?: string | null
    sequels: {
        id: number
        poster: string
        name: string
        altName: string

    }[]
    similar: {
        id: number
        poster: string
        name: string
        altName: string
        rating: number
    }[]
}

export async function getDataKpDev(id: number): Promise<IData | null> {


    const data = await fetch('https://api.kinopoisk.dev/v1.4/movie/' + id, { headers: { 'X-API-KEY': process.env.api_kp || '' } })

    if (data.ok) {
        const movie = await data.json()
        if (movie.error) return null

        let resp: IData = {
            name: movie.name,
            altName: movie.alternativeName,
            description: movie.description,
            relesed: movie.year,
            rating: movie.rating.kp,
            votes: movie.votes.kp,
            slogan: movie.slogan,
            movieLength: movie.movieLength,
            seriesLength: movie.seriesLength,
            ageRating: movie.ageRating,
            status: { name: movie.status == 'announced' ? "анонс" : movie.status == 'completed' ? "завершён" : movie.status == 'filming' ? "киносъемка" : movie.status == 'post-production' ? "постпродакшн" : movie.status == 'pre-production' ? "предпроизводство" : null },
            type: { name: movie.type == 'animated-series' ? 'мультсериал' : movie.type == 'anime' ? 'аниме' : movie.type == 'cartoon' ? 'мультфильм' : movie.type == 'movie' ? 'фильм' : movie.type == 'tv-series' ? 'сериал' : null },
            persons: movie.persons.slice(0, 50),
            genres: movie.genres,
            countries: movie.countries,
            poster: movie.poster.url,
            backdrop: movie.backdrop.url,
            sequels:movie.sequelsAndPrequel ? movie.sequelsAndPrequels.map(s => {
                return {
                    id: s.id,
                    poster: s.poster.url,
                    name: s.name,
                    altName: s.alternativeName,
                }
            }): null,
            similar:movie.similarMovies ? movie.similarMovies.map(s=> {
                 return {
                    id: s.id,
                    poster: s.poster.url,
                    name: s.name,
                    altName: s.alternativeName,
                    rating: s.rating.kp
                }
            }) : null
        }

        return resp;
    }
    return null
}

export async function getDataUnDev(id: number): Promise<IData | null> {
    const data = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films' + id, { headers: { 'X-API-KEY': process.env.api_un || '' } })
    const seq = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films' + id +'/sequels_and_prequels', { headers: { 'X-API-KEY': process.env.api_un || '' } })
    const sim = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films' + id +'/similars', { headers: { 'X-API-KEY': process.env.api_un || '' } })

    if (data.ok) {
        const movie = await data.json()
        const seqPars = await seq.json()
        const simPars = await sim.json()
        if (movie.message) return null

        let resp: IData = {
            name: movie.nameRu,
            altName: movie.nameOriginal,
            poster: movie.posterUrl,
            slogan: movie.slogan,
            relesed: movie.year,
            description: movie.description,
            rating: movie.ratingKinopoisk,
            votes: null,
            movieLength: movie.filmLength,
            countries: movie.countries.map(country => { return { name: country.country } }),
            genres: movie.genres.map(genre => { return { name: genre.genre } }),
            seriesLength: null,
            type: { name: movie.type == 'FILM' ? 'фильм' : 'сериал' },
            ageRating: Number(movie.ratingAgeLimits.replace('age', '')),
            backdrop: movie.coverUrl,
            status: null,
            persons: null,
            sequels: seqPars.map(s=> {
               return {
                 id: s.filmID,
                 name:s.nameRu,
                 altName: s.nameOriginal,
                 poster: s.posterUrl 
               }
            }),
            similar: simPars.items.map(s=> {
               return {
                 id: s.filmID,
                 name:s.nameRu,
                 altName: s.nameOriginal,
                 poster: s.posterUrl 
               }
            })
        }





        return resp;
    }
    return null
}

