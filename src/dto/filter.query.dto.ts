import { IsOptional, IsBooleanString, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterQueryDto {
  @IsOptional()
  @IsBooleanString()
  is_palindrome: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  min_length?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  max_number?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  word_count?: number;

  @IsOptional()
  @IsString()
  contains_character: string;
}
