import { IsString, IsNotEmpty, IsArray, IsIn, ArrayUnique } from 'class-validator';
import type { UUID } from 'crypto';
import { ITEMS_LABELS, type ItemLabel } from './types';

export class UpdateItemDto {
    @IsString()
    @IsNotEmpty()
    name: UUID;

    @IsArray()
    @IsString({ each: true })
    @ArrayUnique()
    @IsIn(Object.values(ITEMS_LABELS), { each: true })
    labels: ItemLabel[];
}