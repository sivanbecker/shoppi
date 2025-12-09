import { IsString, IsArray, IsIn, ArrayUnique, Length, IsNumber, IsPositive } from 'class-validator';
import type { UUID } from 'crypto';
import { ITEMS_LABELS, type ItemLabel } from './types';

export class UpdateItemDto {
    @IsString()
    @Length(3, 100)
    name: UUID;

    @IsArray()
    @IsString({ each: true })
    @ArrayUnique()
    @IsIn(Object.values(ITEMS_LABELS), { each: true })
    labels: ItemLabel[];

    @IsNumber()
    @IsPositive()
    createdAt: number;
}