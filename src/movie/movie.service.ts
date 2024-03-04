import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TitleDto } from './dto/title-movie.dto';
import { MovieResponse } from './interface/movie-response.inteface';
import axios from 'axios';

@Injectable()
export class MovieService {
  async findAll(title: TitleDto) {
    let movieTitle = title.title;

    if (!movieTitle)
      throw new BadRequestException(
        'No se ha introducido un título de película',
      );

    const url = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=es-ES&page=1`;

    const token = process.env.TMDB_API_KEY;

    const movie = await axios.get<MovieResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (movie.data.results.length === 0)
      throw new NotFoundException(
        'No se ha encontrado ninguna película con ese título',
      );

    const movie_id = movie.data.results[0].id;

    const url2 = `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=es-ES&page=1`;

    const similarMovies = await axios.get<MovieResponse>(url2, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      titulo: movie.data.results[0].title,
      titulo_original: movie.data.results[0].original_title,
      puntuacion_media: movie.data.results[0].vote_average,
      fecha_estreno: movie.data.results[0].release_date,
      sinopsis: movie.data.results[0].overview,
      similares:
        similarMovies.data.results.length > 0
          ? [
              similarMovies.data.results[0].title +
                ` (${similarMovies.data.results[0].release_date.split('-')[0]})`,
              similarMovies.data.results[1].title +
                ` (${similarMovies.data.results[1].release_date.split('-')[0]})`,
              similarMovies.data.results[2].title +
                ` (${similarMovies.data.results[2].release_date.split('-')[0]})`,
              similarMovies.data.results[3].title +
                ` (${similarMovies.data.results[3].release_date.split('-')[0]})`,
              similarMovies.data.results[4].title +
                ` (${similarMovies.data.results[4].release_date.split('-')[0]})`,
            ]
          : [],
    };
  }
}
