import { UsersService } from './users.service';
import { UsersController } from './users.controller';


import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        UsersController,],
    providers: [
        UsersService,],
})
export class UsersModule { }
