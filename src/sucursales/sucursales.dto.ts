export class SucursalesDto {
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly lat: number;
    readonly long: number;
}

export class CreateSucursalesDto extends SucursalesDto {}

export class UpdateSucursalesDto extends SucursalesDto {
    readonly id: string;
}