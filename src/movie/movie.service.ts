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
    let movieTitle = title.title.trim();

    if (!movieTitle)
      throw new BadRequestException(
        'No se ha introducido un título de película',
      );

    const url = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=es-ES&page=1`;

    const token = process.env.TMDB_API_KEY;

    const data = await this.getMovie(url, token);

    if (data.length === 0)
      throw new NotFoundException(
        'No se ha encontrado ninguna película con ese título',
      );

    const movie_id = data[0].id;

    const url2 = `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=es-ES&page=1`;

    const similar = await this.getMovie(url2, token);

    console.log(similar);

    return {
      titulo: data[0].title,
      titulo_original: data[0].original_title,
      puntuacion_media: data[0].vote_average,
      fecha_estreno: data[0].release_date,
      sinopsis: data[0].overview,
      similares:
        similar.length > 0
          ? [
              similar[0].title + ` (${similar[0].release_date.split('-')[0]})`,
              similar[1].title + ` (${similar[1].release_date.split('-')[0]})`,
              similar[2].title + ` (${similar[2].release_date.split('-')[0]})`,
              similar[3].title + ` (${similar[3].release_date.split('-')[0]})`,
              similar[4].title + ` (${similar[4].release_date.split('-')[0]})`,
            ]
          : [],
    };
  }

  private async getMovie(url: string, token: string) {
    const { data } = await axios.get<MovieResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.results;
  }
}
