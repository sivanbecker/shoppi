import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { RecipeStepDto } from './recipe-step.dto';

export class RecipeResponseDto {
  id: string;
  name: string;
  description?: string;
  portions: number;
  time: number;
  comments?: string;
  appliances: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  ingredients: RecipeIngredientDto[];
  steps: RecipeStepDto[];
}

