import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateRecipeDto } from './create-recipe.dto';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { RecipeStepDto } from './recipe-step.dto';

describe('CreateRecipeDto', () => {
  const createValidDto = (): CreateRecipeDto => {
    const dto = new CreateRecipeDto();
    dto.name = 'Test Recipe';
    dto.description = 'A test recipe description';
    dto.portions = 4;
    dto.time = 30;
    dto.comments = 'Some comments';
    dto.appliances = ['oven', 'stove'];
    
    const ingredient = new RecipeIngredientDto();
    ingredient.itemId = '123e4567-e89b-12d3-a456-426614174000';
    ingredient.quantity = 2.5;
    ingredient.unit = 'cups';
    ingredient.order = 0;
    dto.ingredients = [ingredient];
    
    const step = new RecipeStepDto();
    step.stepNumber = 1;
    step.description = 'First step';
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

  it('should fail validation when name is too short', async () => {
    const dto = createValidDto();
    dto.name = 'AB';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail validation when name is too long', async () => {
    const dto = createValidDto();
    dto.name = 'A'.repeat(201);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail validation when name is missing', async () => {
    const dto = createValidDto();
    dto.name = undefined as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should pass validation when description is optional', async () => {
    const dto = createValidDto();
    dto.description = undefined;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when description exceeds max length', async () => {
    const dto = createValidDto();
    dto.description = 'A'.repeat(501);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');
  });

  it('should fail validation when portions is zero', async () => {
    const dto = createValidDto();
    dto.portions = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('portions');
  });

  it('should fail validation when portions is negative', async () => {
    const dto = createValidDto();
    dto.portions = -1;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('portions');
  });

  it('should fail validation when time is zero', async () => {
    const dto = createValidDto();
    dto.time = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('time');
  });

  it('should fail validation when time is negative', async () => {
    const dto = createValidDto();
    dto.time = -1;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('time');
  });

  it('should pass validation when comments is optional', async () => {
    const dto = createValidDto();
    dto.comments = undefined;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when comments exceeds max length', async () => {
    const dto = createValidDto();
    dto.comments = 'A'.repeat(2001);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('comments');
  });

  it('should fail validation when appliances array is empty', async () => {
    const dto = createValidDto();
    dto.appliances = [];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('appliances');
  });

  it('should fail validation when appliances contains empty string', async () => {
    const dto = createValidDto();
    dto.appliances = ['oven', ''];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when ingredients array is empty', async () => {
    const dto = createValidDto();
    dto.ingredients = [];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('ingredients');
  });

  it('should fail validation when steps array is empty', async () => {
    const dto = createValidDto();
    dto.steps = [];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('steps');
  });
});

