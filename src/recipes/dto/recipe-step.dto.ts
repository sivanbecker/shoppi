import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RecipeStepDto {
  @IsNumber()
  @Min(1, { message: 'Step number must be at least 1' })
  @Type(() => Number)
  stepNumber: number;

  @IsString()
  @IsNotEmpty({ message: 'Description must not be empty' })
  description: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  optional?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  order?: number;
}

