import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ITEMS_LABELS, type ItemLabel, Item } from './dto/types';
import { CreateItemDto } from './dto/create-item.dto';



@Injectable()
export class ItemsService {

    private items: Item[] = [
        { id: randomUUID(), name: 'banana', labels: [ITEMS_LABELS.FRUIT] },
        { id: randomUUID(), name: 'milk', labels: [ITEMS_LABELS.DAIRY, ITEMS_LABELS.FRIG] },
        { id: randomUUID(), name: 'white-bread', labels: [ITEMS_LABELS.BAKERY] },

    ]
    getAll() {
        return this.items;
    }

    getOne(id: string) {
        const matchingItem = this.items.find((item) => item.id === id);
        if (!matchingItem) {
            return [];
        }
        return matchingItem;
    }

    create(createItemDto: CreateItemDto): Item {
        const newItem = {
            id: randomUUID(),
            name: createItemDto.name,
            labels: createItemDto.labels
        }
        this.items.push(newItem);
        return newItem;
    }
}
