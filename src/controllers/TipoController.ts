import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class TipoController {
  async index(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const tipos = await prisma.tipo.findMany(
      // recupera todos os tipos
      {
        orderBy: { id: "asc" },
        select: {
          id: true, // seleciona as propriedade desejadas dos Tipos
          descricao: true,
          maquinas: {
            select: { id: true, },
          },
        },
      }
    );
    res.status(200).json(tipos);
  }

  async show(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const tipo = await prisma.tipo.findUnique(
      {
        // busca tipo conforme where
        where: { id: Number(req.params.id) },
        select: {
          id: true, // seleciona as propriedade desejadas de tipo
          descricao: true,
          maquinas: {
            select: { id: true },
          },
        },
      }
    );
    res.status(200).json(tipo);
  }

  async store(req: Request, res: Response) {
    const prisma = new PrismaClient();
    //obtém json vindo do cliente. Exemplo Formato: {nome: "Prego", preco:2.3, categoriaId:1}
    const { descricao } = req.body; // Obtenha a descrição dos parâmetros de rota
    const novoTipo = await prisma.tipo.create(
      {
        data: {
          descricao: descricao,
        },
        select: {
          id: true,
          descricao: true,
          maquinas: {
            select: { id: true },
          },
        }
      }
    );

    res.status(201).json(novoTipo);


  }

  async update(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { id, descricao } = req.body;
    const tipoAlterado = await prisma.tipo.update({
      where: { id: Number(req.params.id) },
      data: {
        descricao: descricao,
      },
      select: {
        id: true,
        descricao: true,
        maquinas: {
          select: { id: true },
        },
      },
    });
    res.status(201).json(tipoAlterado);
  }

  async delete(req: Request, res: Response) {
    const prisma = new PrismaClient();
    await prisma.tipo.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({ excluido: true });
  }

}

export default TipoController;