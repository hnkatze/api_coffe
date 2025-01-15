import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuItem } from './menu-items.schema';
import { MenuItemService } from './menu-items.service';


@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  create(@Body() createMenuItemDto: MenuItem) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Get()
  findAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuItemDto: Partial<MenuItem>) {
    return this.menuItemService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemService.remove(id);
  }
}