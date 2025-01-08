import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './history.dtos';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService ) {}

    @Post()
    async saveHistory(@Body() history: CreateHistoryDto) {
        return this.historyService.saveHistory(history);
    }

    @Get()
    @UseGuards(AuthGuard)
    async getHistorys() {
        return this.historyService.getHistorys();
    }
    
}
