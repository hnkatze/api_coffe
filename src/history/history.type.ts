


export type HistoryType = {
    casier: string;
    items: itemsType[];
    status: string;
    table: string;
    delay: Date;
    timesTamp: Date;
    total: number;
    };


    export type itemsType = {
        name: string;
        price: number;
        quantity: number;
        };