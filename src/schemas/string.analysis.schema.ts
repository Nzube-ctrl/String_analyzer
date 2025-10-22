import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at' } })
export class StringAnalysis extends Document {
  @Prop({ required: true, unique: true })
  sha256_hash: string;

  @Prop({ required: true })
  value: string;

  @Prop({ type: Object })
  properties: Record<string, any>;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}
export const StringAnalysisSchema =
  SchemaFactory.createForClass(StringAnalysis);
