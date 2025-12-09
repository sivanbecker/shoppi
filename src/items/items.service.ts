import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileIdNotFoundError } from './errors';
import { randomUUID } from 'crypto';
import { ITEMS_LABELS, type ItemLabel, Item } from './dto/types';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class ItemsService {
    constructor(private prisma: PrismaService) {

    }
    async getAll(): Promise<Item[]> {
        try {
            const items = await this.prisma.item.findMany();
            return items.map(item => ({
                id: item.id,
                name: item.name,
                labels: item.labels as ItemLabel[],
                createdAt: item.createdAt.toISOString()
            }));
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getOne(id: string) {
        const matchingItem = await this.prisma.item.findUnique({ where: { id } });
        if (!matchingItem) {
            throw new ProfileIdNotFoundError(`Profile with ID ${id} not found`);
        }
        return matchingItem;
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const newItem = {
            id: randomUUID(),
            name: createItemDto.name,
            labels: createItemDto.labels
        }
        try {
            const createdItem = await this.prisma.item.create({ data: newItem });
            return {
                id: createdItem.id,
                name: createdItem.name,
                labels: createdItem.labels as ItemLabel[],
                createdAt: createdItem.createdAt.toISOString()
            };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async update(id: string, updateItemDto: UpdateItemDto) {
        const itemToUpdate = await this.prisma.item.findUnique({ where: { id } })
        if (!itemToUpdate) {
            throw new ProfileIdNotFoundError(`Profile with ID ${id} not found`);
        }
        itemToUpdate.name = updateItemDto.name;
        itemToUpdate.labels = updateItemDto.labels;
        await this.prisma.item.update({ where: { id }, data: itemToUpdate })
        return itemToUpdate;
    }

    async remove(id: string) {
        await this.prisma.item.delete({ where: { id } })

    }

}
