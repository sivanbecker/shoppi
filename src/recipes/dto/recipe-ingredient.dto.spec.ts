import 'reflect-metadata';
import { validate } from 'class-validator';
import { RecipeIngredientDto } from './recipe-ingredient.dto';

describe('RecipeIngredientDto', () => {
  const createValidDto = (): RecipeIngredientDto => {
    const dto = new RecipeIngredientDto();
    dto.itemId = '123e4567-e89b-12d3-a456-426614174000';
    dto.quantity = 2.5;
    dto.unit = 'cups';
    dto.order = 0;
    return dto;
  };

  it('should pass validation with valid data', async () => {
    const dto = createValidDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when itemId is missing', async () => {
    const dto = createValidDto();
    dto.itemId = undefined as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('itemId');
  });

  it('should fail validation when itemId is not a valid UUID', async () => {
    const dto = createValidDto();
    dto.itemId = 'not-a-uuid';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('itemId');
  });

  it('should fail validation when quantity is zero', async () => {
    const dto = createValidDto();
    dto.quantity = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('quantity');
  });

  it('should fail validation when quantity is negative', async () => {
    const dto = createValidDto();
    dto.quantity = -1;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('quantity');
  });

  it('should fail validation when quantity is too small', async () => {
    const dto = createValidDto();
    dto.quantity = 0.001;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('quantity');
  });

  it('should fail validation when unit is missing', async () => {
    const dto = createValidDto();
    dto.unit = undefined as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('unit');
  });

  it('should pass validation when order is optional', async () => {
    const dto = createValidDto();
    dto.order = undefined;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when order is negative', async () => {
    const dto = createValidDto();
    dto.order = -1;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('order');
  });
});

