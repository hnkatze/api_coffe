import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { CreateEmployeeDto } from "./employee.dtos";
import { EmployeeService } from "./employee.service";
import { ApiBody } from "@nestjs/swagger";
import { refreshToken } from "./employee.type";


@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService
    ) { }

    @Get('list')
    async getEmployees() {
        return this.employeeService.getEmployees();
    }

    @Post('create')
    async createEmployee(@Body() employee: CreateEmployeeDto) {
        return this.employeeService.createEmployee(employee);
    }
    @Put('update/:id')
    async updateEmployee(@Param('id') id: string, @Body() employee: CreateEmployeeDto) {
        return this.employeeService.updateEmployee(id,employee);
    }

    @Post('get-by-id')
    async getEmployeeById(@Query('id') id: string) {
        return this.employeeService.getEmployeeById(id);
    }


    @Post('login')
    async authenticateEmployee(@Body('name') name: string, @Body('password') password: string) {
        console.log(name, password);
         const response = this.employeeService.authenticateEmployee(name, password);
         console.log({response});
         return response;
    }
    @Post('validateToken')
    async validateToken(@Headers('X-Api-Token') token: string) {
        return this.employeeService.validateToken(token);
    }

     @Post('refresh')
        @ApiBody({ type: refreshToken })
        async refresh(@Headers('X-Api-Token') refreshToken: string) {
          if (!refreshToken) {
            throw new HttpException('Refresh token is required', HttpStatus.BAD_REQUEST);
          }
      
          return this.employeeService.refreshAccessToken(refreshToken);
        }
}