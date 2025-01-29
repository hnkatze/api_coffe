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
    const data =  this.menuItemModel.find().exec();
    const cleanData = (await data).map((item) => {
      const cleanedItem: any = {
      id: item._id,
      category: item.category,
      item: item.item,
      description: item.description,
      image: item.image
      };

      if (item.portions && item.portions.length > 0) {
      cleanedItem.portions = item.portions;
      }

      if (item.price) {
      cleanedItem.price = item.price;
      }

      return cleanedItem;
    });

    return cleanData;
  }

  async findOne(id: string): Promise<MenuItem> {
    return this.menuItemModel.findById(id).exec();
  }

  async update(id: string, updateMenuItemDto: Partial<MenuItem>): Promise<MenuItem> {
    return this.menuItemModel.findByIdAndUpdate(id, updateMenuItemDto, { new: true }).exec();
  }

  async addArrayOfitems(createMenuItemDto: MenuItem[]){
    return this.menuItemModel.insertMany(createMenuItemDto);
  }

  async remove(id: string): Promise<MenuItem> {
    return this.menuItemModel.findByIdAndDelete(id).exec();
  }
}