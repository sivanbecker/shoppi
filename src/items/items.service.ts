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

    private items: Item[] = [
        { id: randomUUID(), name: 'banana', labels: [ITEMS_LABELS.FRUIT], createdAt: new Date(Date.now() - 200).toISOString() },
        { id: randomUUID(), name: 'milk', labels: [ITEMS_LABELS.DAIRY, ITEMS_LABELS.FRIG], createdAt: new Date(Date.now() - 100).toISOString() },
        { id: randomUUID(), name: 'white-bread', labels: [ITEMS_LABELS.BAKERY], createdAt: new Date(Date.now() - 150).toISOString() },

    ]
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

    getOne(id: string) {
        const matchingItem = this.items.find((item) => item.id === id);
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

    update(id: string, updateItemDto: UpdateItemDto) {
        const itemToUpdate = this.items.find((item) => item.id === id);
        if (!itemToUpdate) {
            throw new ProfileIdNotFoundError(`Profile with ID ${id} not found`);
        }
        itemToUpdate.name = updateItemDto.name;
        itemToUpdate.labels = updateItemDto.labels;
        return itemToUpdate;
    }

    remove(id: string) {
        const itemIndexToRemove = this.items.findIndex(item => item.id === id);
        if (itemIndexToRemove === -1) {
            throw new ProfileIdNotFoundError(`Profile with ID ${id} not found`);
        }
        this.items.splice(itemIndexToRemove, 1);

    }

}
