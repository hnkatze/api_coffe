import { ApiProperty } from "@nestjs/swagger";



export class refreshToken{
    @ApiProperty({ example: 'String', description: 'The refresh token of the user' })
    refreshToken: string;

    @ApiProperty({ example: 'String', description: 'The access token of the user' })
    accessToken: string;
}