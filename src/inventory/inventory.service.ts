import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryTemplate, InventoryTemplateDocument } from './inventory-template.schema';
import { Inventory, InventoryDocument } from './inventory.schema';


@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>,
    @InjectModel(InventoryTemplate.name) private templateModel: Model<InventoryTemplateDocument>,
  ) {}

  async create(createInventoryDto: Inventory): Promise<Inventory> {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find().populate('items.menuItem').exec();
  }

  async findOne(id: string): Promise<Inventory> {
    return this.inventoryModel.findById(id).populate('items.menuItem').exec();
  }

  async update(id: string, updateInventoryDto: Partial<Inventory>): Promise<Inventory> {
    return this.inventoryModel.findByIdAndUpdate(id, updateInventoryDto, { new: true }).populate('items.menuItem').exec();
  }

  async remove(id: string): Promise<Inventory> {
    return this.inventoryModel.findByIdAndDelete(id).exec();
  }

  async createInventoryFromTemplate(branchId: string, templateId: string): Promise<Inventory> {
    const template = await this.templateModel.findById(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const inventoryItems = template.items.map(item => ({
      name: item.name,
      quantity: 0,
      unit: item.baseUnit,
      minimumQuantity: 0,
      template: template._id,
      menuItem: item.menuItem,
    }));

    const newInventory = new this.inventoryModel({
      branchId,
      date: new Date(),
      items: inventoryItems,
    });

    return newInventory.save();
  }

  async updateInventoryQuantities(inventoryId: string, quantities: { [key: string]: number }): Promise<Inventory> {
    const inventory = await this.inventoryModel.findById(inventoryId);
    if (!inventory) {
      throw new Error('Inventory not found');
    }

    for (const item of inventory.items) {
      if (quantities[item.name]) {
        const template = await this.templateModel.findById(item.template);
        const templateItem = template.items.find(ti => ti.name === item.name);
        if (templateItem) {
          const totalPortions = templateItem.portions.reduce((sum, portion) => sum + portion.quantity, 0);
          item.quantity = quantities[item.name] * totalPortions;
        }
      }
    }

    return inventory.save();
  }
}