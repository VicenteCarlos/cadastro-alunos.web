import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { alunos } from 'generated/prisma';

@Injectable()
export class AlunoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAluno(payload: object) {
    return await this.prisma.alunos.create({
      data: payload as alunos,
    });
  }

  async findOneAluno(id: string) {
    return await this.prisma.alunos.findUnique({ where: { id } });
  }

  async findByName(nome: string) {
    return await this.prisma.alunos.findFirst({
      where: {
        nome: {
          contains: nome,
        },
      },
    });
  }

  async findAllAluno() {
    return await this.prisma.alunos.findMany();
  }

  async updateAluno(id: string, payload: object) {
    return await this.prisma.alunos.update({ where: { id }, data: payload });
  }

  async deleteAluno(id: string) {
    return await this.prisma.alunos.delete({ where: { id } });
  }
}
