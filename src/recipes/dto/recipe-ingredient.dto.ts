import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RecipeIngredientDto {
  @IsUUID()
  itemId: string;

  @IsNumber()
  @Min(0.01, { message: 'Quantity must be greater than 0' })
  quantity: number;

  @IsString()
  unit: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  order?: number;
}

