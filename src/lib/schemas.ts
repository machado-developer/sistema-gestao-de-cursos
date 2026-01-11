import { z } from 'zod'

// Aluno Schema
export const alunoSchema = z.object({
    nome_completo: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    bi_documento: z.string().min(5, 'BI inválido'),
    data_nascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
    genero: z.string().optional().or(z.literal('')),
    telefone: z.string().optional().or(z.literal('')),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
    Endereco: z.string().optional().or(z.literal('')),
    escolaAcademica: z.string().optional().or(z.literal('')),
    escolaridade: z.string().optional().or(z.literal('')),
})

// Curso Schema
export const cursoSchema = z.object({
    nome: z.string().min(3, 'Nome do curso é obrigatório'),
    descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
    carga_horaria: z.number().positive('Carga horária deve ser positiva'),
    preco: z.number().nonnegative('Preço não pode ser negativo'),
})

// Turma Schema
export const turmaSchema = z.object({
    cursoId: z.string().min(1, 'Selecione um curso'),
    codigo_turma: z.string().min(3, 'Código da turma é obrigatório'),
    data_inicio: z.string().or(z.date()),
    data_fim: z.string().or(z.date()),
    status: z.enum(['Inscrições Abertas', 'Em Andamento', 'Concluída', 'Cancelada']),
})

// Pagamento Schema
export const pagamentoSchema = z.object({
    matriculaId: z.string().min(1, 'ID da matrícula é obrigatório'),
    valor: z.number().positive('O valor deve ser superior a zero'),
    metodo_pagamento: z.enum(['Dinheiro', 'Transferência', 'Multicaixa', 'TPA']),
})

// Matricula (Novo) Schema - Complex validation
export const matriculaSchema = z.object({
    alunoId: z.string().min(1, 'Selecione um aluno'),
    turmaId: z.string().min(1, 'Selecione uma turma'),
    valor_total: z.number().nonnegative(),
    desconto: z.number().nonnegative().default(0),
})

// Instrutor Schema
export const instrutorSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    telefone: z.string().optional().or(z.literal('')),
    especialidade: z.string().optional().or(z.literal('')),
    bi_documento: z.string().optional().or(z.literal('')),
    genero: z.string().optional().or(z.literal('')),
    bio: z.string().optional().or(z.literal('')),
})

