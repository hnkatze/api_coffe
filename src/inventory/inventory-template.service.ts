import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryTemplate, InventoryTemplateDocument } from './inventory-template.schema';


@Injectable()
export class InventoryTemplateService {
  constructor(@InjectModel(InventoryTemplate.name) private templateModel: Model<InventoryTemplateDocument>) {}

  async create(createTemplateDto: InventoryTemplate): Promise<InventoryTemplate> {
    const createdTemplate = new this.templateModel(createTemplateDto);
    return createdTemplate.save();
  }

  async findAll(): Promise<InventoryTemplate[]> {
    return this.templateModel.find().populate('items.menuItem').exec();
  }

  async findOne(id: string): Promise<InventoryTemplate> {
    return this.templateModel.findById(id).populate('items.menuItem').exec();
  }

  async update(id: string, updateTemplateDto: Partial<InventoryTemplate>): Promise<InventoryTemplate> {
    return this.templateModel.findByIdAndUpdate(id, updateTemplateDto, { new: true }).populate('items.menuItem').exec();
  }

  async remove(id: string): Promise<InventoryTemplate> {
    return this.templateModel.findByIdAndDelete(id).exec();
  }
}