import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AlunoController } from './alunos.controller';
import { AlunoService } from './alunos.service';
import { AlunoRepository } from './alunos.repository';

@Module({
  imports: [],
  controllers: [AppController, AlunoController],
  providers: [AppService, PrismaService, AlunoService, AlunoRepository],
})
export class AppModule {}
