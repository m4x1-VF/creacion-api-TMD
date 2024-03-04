import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TitleDto } from './dto/title-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Query() title: TitleDto) {
    return this.movieService.findAll(title);
  }
}
