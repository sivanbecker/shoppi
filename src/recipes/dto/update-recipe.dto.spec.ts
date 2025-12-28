import 'reflect-metadata';
import { validate } from 'class-validator';
import { UpdateRecipeDto } from './update-recipe.dto';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { RecipeStepDto } from './recipe-step.dto';

describe('UpdateRecipeDto', () => {
  const createValidDto = (): UpdateRecipeDto => {
    const dto = new UpdateRecipeDto();
    dto.name = 'Updated Recipe';
    dto.description = 'An updated recipe description';
    dto.portions = 6;
    dto.time = 45;
    dto.comments = 'Updated comments';
    dto.appliances = ['oven', 'microwave'];
    
    const ingredient = new RecipeIngredientDto();
    ingredient.itemId = '123e4567-e89b-12d3-a456-426614174000';
    ingredient.quantity = 3.0;
    ingredient.unit = 'cups';
    ingredient.order = 0;
    dto.ingredients = [ingredient];
    
    const step = new RecipeStepDto();
    step.stepNumber = 1;
    step.description = 'Updated first step';
    step.optional = false;
    step.order = 1;
    dto.steps = [step];
    
    return dto;
  };

  it('should pass validation with valid data', async () => {
    const dto = createValidDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when all fields are optional', async () => {
    const dto = new UpdateRecipeDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when name is too short', async () => {
    const dto = new UpdateRecipeDto();
    dto.name = 'AB';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail validation when name is too long', async () => {
    const dto = new UpdateRecipeDto();
    dto.name = 'A'.repeat(201);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail validation when description exceeds max length', async () => {
    const dto = new UpdateRecipeDto();
    dto.description = 'A'.repeat(501);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');
  });

  it('should fail validation when portions is zero', async () => {
    const dto = new UpdateRecipeDto();
    dto.portions = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('portions');
  });

  it('should fail validation when time is zero', async () => {
    const dto = new UpdateRecipeDto();
    dto.time = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('time');
  });

  it('should fail validation when comments exceeds max length', async () => {
    const dto = new UpdateRecipeDto();
    dto.comments = 'A'.repeat(2001);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('comments');
  });

  it('should fail validation when appliances array is empty', async () => {
    const dto = new UpdateRecipeDto();
    dto.appliances = [];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('appliances');
  });

  it('should fail validation when ingredients array is empty', async () => {
    const dto = new UpdateRecipeDto();
    dto.ingredients = [];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('ingredients');
  });

  it('should fail validation when steps array is empty', async () => {
    const dto = new UpdateRecipeDto();
    dto.steps = [];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('steps');
  });
});

