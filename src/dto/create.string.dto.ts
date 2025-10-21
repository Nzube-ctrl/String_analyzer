import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStringDto {
  @IsNotEmpty({ message: 'value must be a string' })
  @IsString({ message: 'value is required' })
  value: string;
}
