import { z } from "zod";

// lib/schemas.ts


export const funcionarioSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    bi_documento: z.string().min(10, "Documento de identificação inválido").max(15, "Documento de identificação muito longo"),
    nif: z.string().min(9, "NIF inválido").max(14, "NIF inválido").optional().or(z.literal("")),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    telefone: z.string().min(9, "Telefone deve ter pelo menos 9 dígitos").optional().or(z.literal("")),
    genero: z.string().optional().or(z.literal("")),
    data_nascimento: z.string().min(1, "Data de nascimento é obrigatória"),
    cargoId: z.string().optional().or(z.literal("")), // No Prisma é opcional
    departamentoId: z.string().optional().or(z.literal("")), // No Prisma é opcional
    data_admissao: z.string().min(1, "Data de admissão é obrigatória"),
    numero_inss: z.string().optional().or(z.literal("")),
    tipo_contrato: z.enum(["DETERMINADO", "INDETERMINADO", "ESTAGIO"]),
    data_fim: z.string().optional().or(z.literal("")),
    renovacao_automatica: z.boolean().default(false),
    salario_base: z.coerce.number().min(32120, "O salário mínimo nacional é 32,120 Kz"),
    iban: z.string().optional().or(z.literal("")),
    subsidio_alimentacao: z.coerce.number().min(0),
    subsidio_transporte: z.coerce.number().min(0),
    subsidio_residencia: z.coerce.number().min(0).default(0),
    outros_subsidios: z.coerce.number().min(0).default(0),
    hora_entrada: z.string().optional().or(z.literal("")),
    hora_saida: z.string().optional().or(z.literal("")),
    dias_trabalho: z.string().optional().or(z.literal("")),
});

// Exportar o tipo inferido
export type FuncionarioSchema = z.infer<typeof funcionarioSchema>;

// Resto dos schemas...
export const departamentoSchema = z.object({
    nome: z.string().min(2, "O nome do departamento deve ter pelo menos 2 caracteres"),
    descricao: z.string().optional(),
});

export const cargoSchema = z.object({
    nome: z.string().min(2, "O nome do cargo deve ter pelo menos 2 caracteres"),
    departamentoId: z.string().min(1, "Seleccione um departamento"),
    salario_base_sugerido: z.coerce.number().min(0).optional(),
});

export const feriasSchema = z.object({
    funcionarioId: z.string().min(1, "Seleccione um funcionário"),
    data_inicio: z.string().min(1, "Data de início é obrigatória"),
    data_fim: z.string().min(1, "Data de fim é obrigatória"),
    dias_uteis: z.coerce.number().min(1, "Mínimo 1 dia"),
    tipo: z.string().min(1, "Seleccione o tipo"),
    observacao: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email("Endereço de email inválido"),
    password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
});

// Schemas para o módulo de Alunos e Cursos
export const alunoSchema = z.object({
    nome_completo: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    bi_documento: z.string().min(10, "Documento de identificação inválido"),
    data_nascimento: z.string().min(1, "Data de nascimento é obrigatória"),
    genero: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    Endereco: z.string().optional(),
    escolaAcademica: z.string().optional(),
    escolaridade: z.string().optional(),
});

export const instrutorSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    telefone: z.string().optional(),
    especialidade: z.string().optional(),
    bi_documento: z.string().optional(),
    genero: z.string().optional(),
    bio: z.string().optional(),
});

export const cursoSchema = z.object({
    nome: z.string().min(3, "O nome do curso deve ter pelo menos 3 caracteres"),
    carga_horaria: z.coerce.number().min(1, "Carga horária deve ser maior que 0"),
    descricao: z.string().optional(),
    preco_base: z.coerce.number().min(0, "Preço deve ser maior ou igual a 0"),
    media_minima_aprovacao: z.coerce.number().min(0).max(20),
    frequencia_minima: z.coerce.number().min(0).max(100),
});

export const turmaSchema = z.object({
    cursoId: z.string().min(1, "Selecione um curso"),
    codigo_turma: z.string().min(1, "Código da turma é obrigatório"),
    data_inicio: z.string().min(1, "Data de início é obrigatória"),
    data_fim: z.string().min(1, "Data de fim é obrigatória"),
    instrutorId: z.string().optional(),
    vagas: z.coerce.number().min(1, "Número de vagas deve ser maior que 0"),
});

export const matriculaSchema = z.object({
    alunoId: z.string().min(1, "Selecione um aluno"),
    turmaId: z.string().min(1, "Selecione uma turma"),
    valor_total: z.coerce.number().min(0, "Valor total deve ser maior ou igual a 0"),
    valor_pago: z.coerce.number().min(0),
    desconto: z.coerce.number().min(0).default(0),
    estado_pagamento: z.string(),
});

export const pagamentoSchema = z.object({
    matriculaId: z.string().min(1, "Selecione uma matrícula"),
    valor: z.coerce.number().min(0.01, "Valor deve ser maior que 0"),
    metodo_pagamento: z.string().min(1, "Selecione o método de pagamento"),
    data: z.string().optional(),
});
