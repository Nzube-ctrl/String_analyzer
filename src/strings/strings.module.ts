import { Module } from '@nestjs/common';
import { StringsController } from './strings.controller';
import { StringsService } from './strings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StringAnalysis } from 'src/schemas/string.analysis.schema';
import { StringAnalysisSchema } from 'src/schemas/string.analysis.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StringAnalysis.name, schema: StringAnalysisSchema },
    ]),
  ],
  controllers: [StringsController],
  providers: [StringsService],
})
export class StringsModule {}
