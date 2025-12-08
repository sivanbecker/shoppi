import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import type { UUID } from 'crypto';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ProfileIdNotFoundError } from './errors';

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
        try {
            return this.itemsService.getOne(id);
        } catch (e) {
            if (e instanceof ProfileIdNotFoundError) {
                throw new NotFoundException(e.message);
            }
            throw e;
        }

    }
    // POST /items
    @Post()
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto)
    }
    // PUT /items/:id
    @Put(':id')
    update(@Body() updateItemDto: UpdateItemDto, @Param('id', ParseUUIDPipe) id: UUID) {
        try {
            this.itemsService.update(id, updateItemDto);

        } catch (e) {
            if (e instanceof ProfileIdNotFoundError) {
                throw new NotFoundException(e.message);
            }
            throw e;
        }
    }
    // DELETE /items/:id
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: UUID) {
        try {
            this.itemsService.remove(id);
        } catch (e) {
            if (e instanceof ProfileIdNotFoundError) {
                throw new NotFoundException(e.message);
            }
            throw e;
        }
    }

}
