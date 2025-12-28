import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
  Min,
  Length,
  MaxLength,
  ArrayNotEmpty,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { RecipeStepDto } from './recipe-step.dto';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  @Length(3, 200, {
    message: 'Name must be between 3 and 200 characters',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, {
    message: 'Description must not exceed 500 characters',
  })
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Portions must be at least 1' })
  @Type(() => Number)
  portions?: number;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Time must be at least 1 minute' })
  @Type(() => Number)
  time?: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000, {
    message: 'Comments must not exceed 2000 characters',
  })
  comments?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: 'Appliances array must not be empty' })
  @IsString({ each: true })
  @MinLength(1, { each: true, message: 'Each appliance must be non-empty' })
  appliances?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: 'Ingredients array must not be empty' })
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  ingredients?: RecipeIngredientDto[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: 'Steps array must not be empty' })
  @ValidateNested({ each: true })
  @Type(() => RecipeStepDto)
  steps?: RecipeStepDto[];
}

