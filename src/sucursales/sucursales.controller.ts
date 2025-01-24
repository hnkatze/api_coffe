/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { CreateSucursalesDto, UpdateSucursalesDto } from './sucursales.dto';

@Controller('sucursales')
export class SucursalesController {
  constructor(private readonly sucursalesService: SucursalesService) {}

  @Post()
  async create(@Body() createSucursalesDto: CreateSucursalesDto) {
    return this.sucursalesService.create(createSucursalesDto);
  }

  @Get()
  async findAll() {
    return this.sucursalesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sucursalesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSucursalesDto: UpdateSucursalesDto) {
    return this.sucursalesService.update(id, updateSucursalesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sucursalesService.remove(id);
  }
}
