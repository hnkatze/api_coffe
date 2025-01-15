import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './history.dtos';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) { }

    @Post()
    async saveHistory(@Body() history: CreateHistoryDto) {
        return this.historyService.saveHistory(history);
    }

    @Get()
    async getHistorys() {
        return this.historyService.getHistorys();
    }

    @Post('date')
    @UseGuards(AuthGuard)
    async getHistoryByDateBetween(@Body() { start, end }: { start: string, end: string }) {
        return this.historyService.getHistoryByDateBetween(start, end);
    }
}
