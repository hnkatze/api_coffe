import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryTemplateService } from './inventory-template.service';
import { InventoryTemplate } from './inventory-template.schema';

@Controller('inventory-templates')
export class InventoryTemplateController {
  constructor(private readonly inventoryTemplateService: InventoryTemplateService) {}

  @Post()
  create(@Body() createTemplateDto: InventoryTemplate) {
    return this.inventoryTemplateService.create(createTemplateDto);
  }

  @Get()
  findAll() {
    return this.inventoryTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryTemplateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateDto: Partial<InventoryTemplate>) {
    return this.inventoryTemplateService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryTemplateService.remove(id);
  }
}