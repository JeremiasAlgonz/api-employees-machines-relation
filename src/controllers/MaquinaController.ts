import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//imoporta o date-fns -> Uma biblioteca de manipulação de datas
import { format, parseISO } from 'date-fns';

class MaquinaController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const maquinas = await prisma.maquina.findMany(
            // recupera todos as maquinas
            {
                select: {
                    id: true, // seleciona as propriedade desejadas das maquinas
                    potencia: true,
                    producao: true,
                    dataCompra: true,
                    //Esse select é para não mostrar o Tipo ID, acho feio (tipo: true, carrega tipoId, descricao de Tipo)
                    tipo: { select: { descricao: true } },
                },
            }
        );

        res.status(200).json(maquinas);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const maquina = await prisma.maquina.findUnique(
            {
                // busca tipo conforme where
                where: { id: Number(req.params.id) },
                select: {
                    id: true, // seleciona as propriedade desejadas da maquina
                    potencia: true,
                    producao: true,
                    dataCompra: true,
                    //Esse select é para não mostrar o Tipo ID, acho feio (tipo: true, carrega tipoId, descricao de Tipo)
                    tipo: { select: { descricao: true } },
                },
            }
        );

        res.status(200).json(maquina);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        //obtém json vindo do cliente. Exemplo Formato: {nome: "Prego", preco:2.3, categoriaId:1}
        const { potencia, producao, dataCompra, tipoId } = req.body; // Obtenha a descrição dos parâmetros de rota
        const novaMaquina = await prisma.maquina.create(
            {
                data: {
                    potencia: potencia,
                    producao: producao,
                    dataCompra: dataCompra,
                    tipo: { connect: { id: tipoId } }, //associa a maquina a um Tipo
                },
                select: {
                    id: true, // seleciona as propriedade desejadas da maquina
                    potencia: true,
                    producao: true,
                    dataCompra: true,
                    //Esse select é para não mostrar o Tipo ID, acho feio (tipo: true, carrega tipoId, descricao de Tipo)
                    tipo: { select: { descricao: true } },
                }
            }
        );

        res.status(201).json(novaMaquina);


    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { id, potencia, producao, dataCompra, tipoId } = req.body;
        const maquinaAlterada = await prisma.maquina.update({
            where: { id: Number(req.params.id) },
            data: {
                potencia: potencia,
                producao: producao,
                dataCompra: dataCompra,
                tipo: { connect: { id: tipoId } }, //associa a maquina a um Tipo
            },
            select: {
                id: true, // seleciona as propriedade desejadas da maquina
                    potencia: true,
                    producao: true,
                    dataCompra: true,
                    //Esse select é para não mostrar o Tipo ID, acho feio (tipo: true, carrega tipoId, descricao de Tipo)
                    tipo: { select: { descricao: true } },
            },
        });
        res.status(201).json(maquinaAlterada);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.maquina.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(200).json({ excluido: true });
    }

}

export default MaquinaController;