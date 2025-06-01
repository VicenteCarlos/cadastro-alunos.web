import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AlunoService, payload } from './alunos.service';

@Controller('/alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async createAluno(
    @Req() req: Request,
    @Res() res: Response,
    @Body() payload: payload,
  ) {
    const data = await this.alunoService.createAluno(payload);

    res.status(HttpStatus.CREATED).json({ data });
  }

  @Get()
  async findAllAluno(@Req() req: Request, @Res() res: Response) {
    const data = await this.alunoService.findAllAluno();

    res.status(HttpStatus.OK).json({ data });
  }

  @Get(':id')
  async findOneAluno(
    @Req() req: Request,
    @Res() res: Response,
    @Param() id: string,
  ) {
    const data = await this.alunoService.findOneAluno(id['id']);

    res.status(HttpStatus.OK).json({ data });
  }

  @Get('/byName/:name')
  async findAlunoByName(
    @Req() req: Request,
    @Res() res: Response,
    @Param() name: string,
  ) {
    const data = await this.alunoService.findAlunoByName(name['name']);

    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  async updateAluno(
    @Req() req: Request,
    @Res() res: Response,
    @Body() payload: object,
    @Param() id: string,
  ) {
    const data = await this.alunoService.updateAluno(id['id'], payload);

    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  async deleteAluno(
    @Req() req: Request,
    @Res() res: Response,
    @Param() id: string,
  ) {
    await this.alunoService.deleteAluno(id['id']);

    res.status(HttpStatus.OK).json({ message: 'Aluno deletado' });
  }
}
