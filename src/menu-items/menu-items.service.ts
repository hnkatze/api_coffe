import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem, MenuItemDocument } from './menu-items.schema';


@Injectable()
export class MenuItemService {
  constructor(@InjectModel(MenuItem.name) private menuItemModel: Model<MenuItemDocument>) {}

  async create(createMenuItemDto: MenuItem): Promise<MenuItem> {
    const createdMenuItem = new this.menuItemModel(createMenuItemDto);
    return createdMenuItem.save();
  }

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemModel.find().exec();
  }

  async findOne(id: string): Promise<MenuItem> {
    return this.menuItemModel.findById(id).exec();
  }

  async update(id: string, updateMenuItemDto: Partial<MenuItem>): Promise<MenuItem> {
    return this.menuItemModel.findByIdAndUpdate(id, updateMenuItemDto, { new: true }).exec();
  }

  async remove(id: string): Promise<MenuItem> {
    return this.menuItemModel.findByIdAndDelete(id).exec();
  }
}