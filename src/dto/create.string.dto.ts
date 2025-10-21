import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStringDto {
  @IsNotEmpty()
  @IsString()
  value: string;
}
