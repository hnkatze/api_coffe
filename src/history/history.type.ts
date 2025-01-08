


export type HistoryType = {
    casier: string;
    items: itemsType[];
    status: string;
    table: string;
    timestamp: string;
    total: number;
    };


    export type itemsType = {
        name: string;
        price: number;
        quantity: number;
        };