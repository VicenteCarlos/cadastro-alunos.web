import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlunoRepository } from './alunos.repository';

export interface payload {
  nome: string;
  idade: number;
  altura: number;
  cpf: string;
}

@Injectable()
export class AlunoService {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  async createAluno(payload: payload) {
    await this.findByName(payload['nome']);

    const alunoCreated = await this.alunoRepository.createAluno(payload);

    return alunoCreated;
  }

  async findOneAluno(id: string) {
    const alunoFoud = await this.alunoRepository.findOneAluno(id);

    if (!alunoFoud) throw new NotFoundException('Aluno não existe');

    return alunoFoud;
  }

  async findAllAluno() {
    return await this.alunoRepository.findAllAluno();
  }

  private async findByName(nome: string) {
    const alunoFoud = await this.alunoRepository.findByName(nome);

    if (alunoFoud) throw new ConflictException('Aluno já cadastrado');
  }

  public async findAlunoByName(nome: string) {
    const alunoFoud = await this.alunoRepository.findByName(nome);

    if (!alunoFoud) throw new NotFoundException('Aluno não existe');

    return alunoFoud
  }

  async updateAluno(id: string, payload: object) {
    return await this.alunoRepository.updateAluno(id, payload);
  }

  async deleteAluno(id: string) {
    return await this.alunoRepository.deleteAluno(id);
  }
}
