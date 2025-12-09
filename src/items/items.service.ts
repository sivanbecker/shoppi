import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileIdNotFoundError } from './errors';
import { randomUUID } from 'crypto';
import { ITEMS_LABELS, type ItemLabel, Item } from './dto/types';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';



@Injectable()
export class ItemsService {


    private items: Item[] = [
        { id: randomUUID(), name: 'banana', labels: [ITEMS_LABELS.FRUIT], createdAt: Date.now() - 200 },
        { id: randomUUID(), name: 'milk', labels: [ITEMS_LABELS.DAIRY, ITEMS_LABELS.FRIG], createdAt: Date.now() - 100 },
        { id: randomUUID(), name: 'white-bread', labels: [ITEMS_LABELS.BAKERY], createdAt: Date.now() - 150 },

    ]
    getAll() {
        return this.items;
    }

    getOne(id: string) {
        const matchingItem = this.items.find((item) => item.id === id);
        if (!matchingItem) {
            throw new ProfileIdNotFoundError(`Profile with ID ${id} not found`);
        }
        return matchingItem;
    }

    create(createItemDto: CreateItemDto): Item {
        const newItem = {
            id: randomUUID(),
            name: createItemDto.name,
            labels: createItemDto.labels,
            createdAt: Date.now()
        }
        this.items.push(newItem);
        return newItem;
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
