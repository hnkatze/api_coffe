import { SucursalesModule } from './sucursales/sucursales.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HistoryModule } from './history/history.module';
import { InventoryModule } from './inventory/inventory.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    HistoryModule,
    InventoryModule,
    EmployeeModule,
    SucursalesModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
