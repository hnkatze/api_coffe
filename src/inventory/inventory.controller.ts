import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.schema';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: Inventory) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get(':sucursalId')
  findAll( @Param('sucursalId') sucursalId: string) {
    return this.inventoryService.findAll(sucursalId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Get(':sucursalId/items')
  getOnlyItems(@Param('sucursalId') sucursalId: string) {
    return this.inventoryService.getOnlyItems(sucursalId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: Partial<Inventory>) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }

  @Post('from-template')
  createFromTemplate(@Body() data: { branchId: string; templateId: string }) {
    return this.inventoryService.createInventoryFromTemplate(data.branchId, data.templateId);
  }

  @Patch(':id/quantities')
  updateQuantities(@Param('id') id: string, @Body() quantities: { [key: string]: number }) {
    return this.inventoryService.updateInventoryQuantities(id, quantities);
  }
}