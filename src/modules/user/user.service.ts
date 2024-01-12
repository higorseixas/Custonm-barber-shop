import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { hash } from 'bcryptjs';

import { GetUserDto } from './dto/user.dto';

import { UserInterface } from '../../interfaces/userInterface';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(page: number, pageSize: number, getUserDto: GetUserDto) {
    const { orderBy } = getUserDto;

    const skip = (page - 1) * pageSize;

    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        cellphone: true,
        userType: true,
        typeId: true,
        scheduling: true,
        os: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: pageSize,
      orderBy: {
        [orderBy || 'id']: 'asc',
      },
    });
  }

  async createUser(requestUser: UserInterface) {
    return await this.getUser(requestUser.cpf)
      .then(async (user) => {
        if (!user) {
          const hashedPassword = await hash(requestUser.password, 10);
          const typeIdInt = parseInt(requestUser.typeId.toString());
          return this.prisma.user
            .create({
              data: {
                name: requestUser.name,
                cpf: requestUser.cpf.replace(/[^a-zA-Z0-9]/g, ''),
                password: hashedPassword,
                cellphone: requestUser.cellphone,
                typeId: typeIdInt,
              },
            })
            .then((result) => result)
            .catch((error) => {
              console.log(error);
              throw new Error('Erro ao criar usuário!');
            });
        } else {
          throw new Error('Usuário já existe na base de dados!');
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error.message);
      });
  }

  async getUserById(id: number) {
    return await this.prisma.user
      .findUnique({ where: { id: id } })
      .then((result) => result)
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  async getUser(cpf: string) {
    return await this.prisma.user
      .findUnique({ where: { cpf: cpf } })
      .then((result) => result)
      .catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });
  }

  async updateUser(requestUser: UserInterface) {
    return await this.getUser(requestUser.cpf)
      .then(async (user) => {
        if (!user) {
          throw new Error('Usuário não encontrado!');
        } else {
          return await this.prisma.user
            .update({
              where: { cpf: requestUser.cpf },
              data: {
                name: requestUser.name,
                cellphone: requestUser.cellphone,
                typeId: requestUser.typeId,
              },
            })
            .then((result) => result)
            .catch((error) => {
              console.log(error);
              throw new Error(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error.message);
      });
  }

  async deleteUser(cpf: string) {
    return await this.getUser(cpf)
      .then(async (user) => {
        if (!user) {
          throw new Error('Usuário não encontrado!');
        } else {
          return await this.prisma.user
            .delete({ where: { cpf: cpf } })
            .then((result) => result)
            .catch((error) => {
              console.log(error);
              throw new Error(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error.message);
      });
  }

  async getUserFromToken(token: string): Promise<UserInterface> {
    return this.jwtService
      .verifyAsync(token)
      .then(async (payload) => {
        const userInfo = await this.getUserById(payload.sub);
        if (userInfo) {
          const user = { ...userInfo };
          delete user.password;

          return user;
        } else {
          throw new HttpException(
            'Usuário não encontrado!',
            HttpStatus.UNAUTHORIZED,
          );
        }
      })
      .catch((error) => {
        console.log(error);
        throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
      });
  }
}
