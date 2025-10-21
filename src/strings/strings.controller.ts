import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  BadRequestException
} from '@nestjs/common';
import { StringsService } from './strings.service';
import { FilterQueryDto } from 'src/dto/filter.query.dto';
import { CreateStringDto } from 'src/dto/create.string.dto';

@Controller('strings')
export class StringsController {
  constructor(private stringService: StringsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateStringDto) {
    return this.stringService.createString(dto);
  }

  @Get(':value')
  async getOne(@Param('value') value: string) {
    return this.stringService.getString(value);
  }

  @Get()
  async getAll(@Query() filters: FilterQueryDto) {
    return this.stringService.getAllStrings(filters);
  }

  @Get('filter-by-natural-language')
  async filterNaturalLanguage(@Query('query') query: string) {
    return this.stringService.naturalLanguageFilter(query);
  }

  @Delete(':value')
  @HttpCode(204)
  async deleteString(@Param('value') value: string) {
    return this.stringService.deleteString(value);
  }
}
