import { IsString, MinLength } from 'class-validator';

export class TitleDto {
  @IsString()
  @MinLength(3)
  title: string;
}
