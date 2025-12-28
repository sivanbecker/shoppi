import 'reflect-metadata';
import { validate } from 'class-validator';
import { RecipeStepDto } from './recipe-step.dto';

describe('RecipeStepDto', () => {
  const createValidDto = (): RecipeStepDto => {
    const dto = new RecipeStepDto();
    dto.stepNumber = 1;
    dto.description = 'First step description';
    dto.optional = false;
    dto.order = 1;
    return dto;
  };

  it('should pass validation with valid data', async () => {
    const dto = createValidDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when stepNumber is missing', async () => {
    const dto = createValidDto();
    dto.stepNumber = undefined as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('stepNumber');
  });

  it('should fail validation when stepNumber is zero', async () => {
    const dto = createValidDto();
    dto.stepNumber = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('stepNumber');
  });

  it('should fail validation when stepNumber is negative', async () => {
    const dto = createValidDto();
    dto.stepNumber = -1;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('stepNumber');
  });

  it('should pass validation when stepNumber is 1', async () => {
    const dto = createValidDto();
    dto.stepNumber = 1;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when description is missing', async () => {
    const dto = createValidDto();
    dto.description = undefined as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');
  });

  it('should fail validation when description is empty', async () => {
    const dto = createValidDto();
    dto.description = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');
  });

  it('should pass validation when optional is undefined', async () => {
    const dto = createValidDto();
    dto.optional = undefined;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when optional is false', async () => {
    const dto = createValidDto();
    dto.optional = false;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when optional is true', async () => {
    const dto = createValidDto();
    dto.optional = true;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
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

