import { Injectable } from '@nestjs/common';
import { SucursalesDocument } from './sucursales.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {  CreateSucursalesDto, UpdateSucursalesDto } from './sucursales.dto';

@Injectable()
export class SucursalesService {

    // SucursalesDto
    constructor(@InjectModel('Sucursales') private readonly sucursalesModel: Model<SucursalesDocument>) { }

    async create(createSucursalesDto: CreateSucursalesDto): Promise<SucursalesDocument> {
        const createdSucursales = new this.sucursalesModel(createSucursalesDto);
        return createdSucursales.save();
    }

    async findAll(): Promise<SucursalesDocument[]> {
        return this.sucursalesModel.find().exec();
    }

    async findOne(id: string): Promise<SucursalesDocument> {
        return this.sucursalesModel.findById(id).exec();
    }

    async update(id: string, updateSucursalesDto: UpdateSucursalesDto): Promise<SucursalesDocument> {
        return this.sucursalesModel.findByIdAndUpdate(id, updateSucursalesDto, { new: true }).exec();
    }

    async remove(id: string): Promise<SucursalesDocument> {
        return this.sucursalesModel.findByIdAndDelete(id).exec();
    }
}
