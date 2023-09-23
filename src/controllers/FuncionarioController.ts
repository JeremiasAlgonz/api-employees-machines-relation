import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class FuncionarioController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const funcionarios = await prisma.funcionario.findMany(
            // recupera todos os funcionarios
            {
                orderBy: { nome: "asc" },
                select: {
                    id: true, // seleciona as propriedade desejadas de Funcionarios
                    nome: true,
                    salario: true,
                    cpf: true,
                    maquinas: {
                        select: { id: true, tipo:{select: {descricao: true}} },
                    },
                },
            }
        );
        res.status(200).json(funcionarios);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const funcionario = await prisma.funcionario.findUnique(
            // busca funcionario conforme where
            {
                where: { id: Number(req.params.id) },
                select: {
                    id: true, // seleciona as propriedade desejadas de Funcionario
                    nome: true,
                    salario: true,
                    cpf: true,
                    maquinas: {
                        select: { id: true },
                    },
                },
            }
        );
        res.status(200).json(funcionario);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        //obtém json vindo do cliente. Exemplo Formato: {nome: "Prego", preco:2.3, categoriaId:1}
        const { nome, salario, cpf } = req.body; // Obtenha a descrição dos parâmetros de rota
        const novoFuncionario = await prisma.funcionario.create(
            {
                data: {
                    nome: nome,
                    salario: salario,
                    cpf: cpf,
                },
                select: {
                    id: true,
                    nome: true,
                    salario: true,
                    cpf: true,
                }
            }
        );

        res.status(201).json(novoFuncionario);


    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { id, nome, salario, cpf } = req.body;
        const funcionarioAlterado = await prisma.funcionario.update({
            where: { id: Number(req.params.id) },
            data: {
                nome: nome,
                salario: salario,
                cpf: cpf,
            },
            select: {
                id: true,
                nome: true,
                salario: true,
                cpf: true,
            },
        });
        res.status(201).json(funcionarioAlterado);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.funcionario.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(200).json({ excluido: true });
    }

    async associarMaquinas(req: Request, res: Response) {
        //exemplo de JSON recebido:> {"maquinas":[1, 2]}
        const { maquinas } = req.body;
        const dados = maquinas.map((x: any) => {
            return { id: x };
        }); //resulta em -> [{"id": 1},{"id":2}]

        const prisma = new PrismaClient();
        const funcionarioAlterado = await prisma.funcionario.update({
            where: { id: Number(req.params.id) },
            data: {
                maquinas: { connect: dados }, //associa a maquina ao funcionario
            },
            select: {
                id: true, // seleciona as propriedade desejadas do funcionario
                nome: true,
                salario: true,
                cpf: true,
                maquinas: {
                    select: { id: true },
                },
            }

        })

        res.status(200).json(funcionarioAlterado);
    }


}

export default FuncionarioController;
