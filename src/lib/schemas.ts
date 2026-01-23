import { z } from "zod";

export const funcionarioSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    bi_documento: z.string().min(10, "Documento de identificação inválido").max(15, "Documento de identificação muito longo"),
    nif: z.string().min(9, "NIF inválido").max(14, "NIF inválido").optional().or(z.literal("")),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    telefone: z.string().min(9, "Telefone deve ter pelo menos 9 dígitos").optional().or(z.literal("")),
    cargoId: z.string().min(1, "Seleccione um cargo"),
    departamentoId: z.string().min(1, "Seleccione um departamento"),
    data_admissao: z.string().min(1, "Data de admissão é obrigatória"),
    numero_inss: z.string().optional().or(z.literal("")),
    salario_base: z.coerce.number().min(32120, "O salário mínimo nacional é 32,120 Kz"),
    subsidio_alimentacao: z.coerce.number().min(0),
    subsidio_transporte: z.coerce.number().min(0),
});

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
