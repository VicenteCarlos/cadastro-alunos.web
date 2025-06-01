/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `alunos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "alunos_nome_key" ON "alunos"("nome");
