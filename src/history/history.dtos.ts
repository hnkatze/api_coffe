import { itemsType } from "./history.type";


export class CreateHistoryDto {
  readonly casier: string;
  readonly items: itemsType[];
  readonly status: string;
  readonly table: string;
  readonly timesTamp: string;
  readonly total: number;
}