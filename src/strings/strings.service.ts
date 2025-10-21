import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { StringAnalysis } from 'src/schemas/string.analysis.schema';
import { analyzeString } from 'src/utils/string.analyzer.utils';
import { parseNaturalLanguageQuery } from 'src/utils/natural.language.parser.util';
import { CreateStringDto } from 'src/dto/create.string.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StringsService {
  constructor(
    @InjectModel(StringAnalysis.name)
    private stringModel: Model<StringAnalysis>,
  ) {}

  async createString(dto: CreateStringDto) {
    const { value } = dto;
    const analysis = analyzeString(value);
    const existing = await this.stringModel.findOne({
      sha256_hash: analysis.sha256_hash,
    });
    if (existing)
      throw new ConflictException('String already exists in the system');
    const newDoc = new this.stringModel({
      sha256_hash: analysis.sha256_hash,
      value,
      properties: analysis,
    });
    return newDoc.save();
  }

  async getString(value: string) {
    const hash = analyzeString(value).sha256_hash;
    const found = await this.stringModel.findOne({ sha256_hash: hash });
    if (!found) throw new NotFoundException('String not found');
    return found;
  }

  async getAllStrings(filters: any) {
    const query: any = {};

    if (filters.is_palindrome !== undefined)
      query['properties.is_palindrome'] = filters.is_palindrome === 'true';
    if (filters.min_length)
      query['properties.length'] = { $gte: +filters.min_length };
    if (filters.max_length)
      query['properties.length'] = {
        ...query['properties.length'],
        $lte: +filters.max_length,
      };
    if (filters.word_count)
      query['properties.word_count'] = +filters.word_count;
    if (filters.contains_character)
      query.value = new RegExp(filters.contains_character, 'i');

    const data = await this.stringModel.find(query);
    return { data, count: data.length, filters_applied: filters };
  }

  async naturalLanguageFilter(query: string) {
    const filters = parseNaturalLanguageQuery(query);
    const result = await this.getAllStrings(filters);
    return {
      ...result,
      interpreted_query: { original: query, parsed_filters: filters },
    };
  }

  async deleteString(value: string) {
    const hash = analyzeString(value).sha256_hash;
    const res = await this.stringModel.deleteOne({ sha256_hash: hash });
    if (res.deletedCount === 0) throw new NotFoundException('String not found');
    return;
  }
}
