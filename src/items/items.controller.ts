import { Controller, Get, Param, ParseUUIDPipe, Post, Body } from '@nestjs/common';
import type { UUID } from 'crypto';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {

    constructor(private itemsService: ItemsService) { }

    // GET /items
    @Get()
    getAll() {
        return this.itemsService.getAll();
    }
    // GET /items/:id
    @Get(':id')
    getOne(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.itemsService.getOne(id);
    }
    // POST /items
    @Post()
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto)
    }
    // PUT /items/:id
    // DELETE /items/:id


}
