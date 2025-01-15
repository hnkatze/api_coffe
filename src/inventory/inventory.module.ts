import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryTemplate, InventoryTemplateSchema } from './inventory-template.schema';
import { Inventory, InventorySchema } from './inventory.schema';
import { MenuItem, MenuItemSchema } from '../menu-items/menu-items.schema';
import { MenuItemController } from 'src/menu-items/menu-items.controller';
import { MenuItemService } from 'src/menu-items/menu-items.service';
import { InventoryTemplateController } from './inventory-template.controller';
import { InventoryTemplateService } from './inventory-template.service';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Inventory.name, schema: InventorySchema },
        { name: InventoryTemplate.name, schema: InventoryTemplateSchema },
        { name: MenuItem.name, schema: MenuItemSchema },
      ]),
    ],
    providers: [InventoryService, MenuItemService, InventoryTemplateService],
    controllers: [InventoryController, MenuItemController, InventoryTemplateController],
    exports: [InventoryService, MenuItemService, InventoryTemplateService],
  })
  export class InventoryModule {}