


export class CreateHistoryDto {
  readonly casier: string;
  readonly items: orderItemDto[];
  readonly status: string;
  readonly table: string;
  readonly delay: Date;
  readonly timesTamp: Date;
  readonly total: number;
}


export class orderItemDto {
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
}