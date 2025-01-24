import { SucursalesService } from './sucursales.service';
import { SucursalesController } from './sucursales.controller';
import { Module } from '@nestjs/common';
import { SucursalesSchema } from './sucursales.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [    MongooseModule.forFeature([{ name: 'Sucursales', schema: SucursalesSchema }]),
        AuthModule,],
    controllers: [
        SucursalesController,],
    providers: [
        SucursalesService,],
})
export class SucursalesModule { }
