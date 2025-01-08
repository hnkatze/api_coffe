import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHistoryDto } from './history.dtos';
import {History, HistoryDocument } from './history.schema';

@Injectable()
export class HistoryService {

    constructor(
        @InjectModel('History') private readonly historyModel: Model<HistoryDocument>,
    ) {}

    async saveHistory(history:CreateHistoryDto): Promise<History>{
        const newHistory = new this.historyModel(history);
        await newHistory.save();
        return newHistory;
    }
    async getHistorys(): Promise<History[]>{ 
        return this.historyModel.find().exec();
    }
}
