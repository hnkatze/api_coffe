import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeDocument } from './employee.schema';
import { CreateEmployeeDto } from './employee.dtos';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';


@Injectable()
export class EmployeeService {
    constructor(@InjectModel('Employee') private readonly employeeModel: Model<EmployeeDocument>, private jwtService: JwtService) { }

    async createEmployee(employee: CreateEmployeeDto) {
        const newEmployee = new this.employeeModel(employee);
        return newEmployee.save();
    }

    async authenticateEmployee(name: string, password: string) {
        const user = await this.employeeModel.findOne({ name, password }).exec();
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            return response.status(404).json({ message: 'User not found' });
        }else{
           
            return this.issueTokens(user.id.toString(), user.name, user.role, user.sucursalId.toString());
        }

    }

    async validateToken(token: string) {
        try {
            const payload = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
            return payload;
        } catch {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Genera nuevos access tokens usando un refresh token válido
     * @param refreshToken Refresh token enviado por el cliente
     * @returns Object con un nuevo accessToken
     */
    async refreshAccessToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, { secret: process.env.SECRET_KEY });
            const newAccessToken = this.jwtService.sign(
                { userId: payload.userId },
                { secret: process.env.SECRET_KEY, expiresIn: '15m' },
            );

            return { accessToken: newAccessToken };
        } catch {
            throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Emite un par de tokens: access y refresh
     * @param userId ID del usuario
     * @param username Nombre del usuario (opcional)
     * @returns Object con accessToken y refreshToken
     */
    private issueTokens(id: string, name?: string, role?: string, sucursalId?: string) {
        const payload = { id, name, role,sucursalId};
        const accessToken = this.jwtService.sign(payload, { secret: process.env.SECRET_KEY, expiresIn: '15m' });
        const refreshToken = this.jwtService.sign(payload, { secret: process.env.SECRET_KEY, expiresIn: '7d' });



        return {
            accessToken,
            refreshToken,
        };
    }

    async getEmployees() {
        return this.employeeModel.find().exec();
    }

    async getEmployeeById(id: string) {
        const user = await this.employeeModel.findById(id).exec();
        return { user };
    }

    async existEmployee(name: string, password: string) {
        return this.employeeModel.findOne({ name, password }).exec();
    }
    async updateEmployee(id: string, employee: CreateEmployeeDto) {
        return this.employeeModel.findByIdAndUpdate(id, employee, { new: true }).exec();
    }

    async getRoleIdAndName(userName: string, password: string) {
        return this.employeeModel.findOne({ name: userName, password: password }).select('role name id').exec();
    }

}