import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { StringsService } from './strings.service';
import { FilterQueryDto } from 'src/dto/filter.query.dto';
import { CreateStringDto } from 'src/dto/create.string.dto';

@Controller('strings')
export class StringsController {
  constructor(private stringService: StringsService) {}

  @Post('')
  @HttpCode(201)
  async create(@Body() dto: CreateStringDto) {
    const created = await this.stringService.createString(dto);

    return {
      id: created._id, // ✅ add id
      sha256_hash: created.sha256_hash, // ✅ keep only for creation response
      value: created.value,
      properties: created.properties,
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  }

  @Get(':value')
  async getOne(@Param('value') value: string) {
    const found = await this.stringService.getString(value);
    return {
      id: found._id,
      value: found.value,
      properties: found.properties,
      created_at: found.created_at,
      updated_at: found.updated_at,
    };
  }

  @Get('')
  async getAll(@Query() filters: FilterQueryDto) {
    const result = await this.stringService.getAllStrings(filters);

    return {
      data: result.data.map((item) => ({
        id: item._id,
        value: item.value,
        properties: item.properties,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })),
      count: result.count,
      filters_applied: result.filters_applied,
    };
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
