export class SucursalesDto {
    readonly name: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly radius: number;
}

export class CreateSucursalesDto  {
    readonly name: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly radius: number; 
}

export class UpdateSucursalesDto  {
    readonly id: string;
    readonly name: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly radius: number;
}