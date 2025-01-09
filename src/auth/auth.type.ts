import { ApiProperty } from "@nestjs/swagger";

// export interface AuthType{
//     userName: string;
//     role: string;
//     userId: string;
// }


export class AuthType {
    @ApiProperty({ example: 'String', description: 'The username of the user' })
    userName: string;

    @ApiProperty({ example: 'String', description: 'The role of the user' })
    role: string;

    @ApiProperty({ example: 'String', description: 'The ID of the user' })
    userId: string;
}


export class refreshToken{
    @ApiProperty({ example: 'String', description: 'The refresh token of the user' })
    refreshToken: string;

    @ApiProperty({ example: 'String', description: 'The access token of the user' })
    accessToken: string;
}