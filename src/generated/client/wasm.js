
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AlunoScalarFieldEnum = {
  id: 'id',
  nome_completo: 'nome_completo',
  bi_documento: 'bi_documento',
  email: 'email',
  data_nascimento: 'data_nascimento',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  telefone: 'telefone',
  genero: 'genero',
  escolaAcademica: 'escolaAcademica',
  escolaridade: 'escolaridade',
  Endereco: 'Endereco',
  bolseiro: 'bolseiro',
  userId: 'userId',
  empresaId: 'empresaId'
};

exports.Prisma.EmpresaClienteScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  nif: 'nif',
  email: 'email',
  telefone: 'telefone',
  endereco: 'endereco',
  responsavel: 'responsavel',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DocumentoScalarFieldEnum = {
  id: 'id',
  alunoId: 'alunoId',
  funcionarioId: 'funcionarioId',
  tipo: 'tipo',
  url: 'url',
  nome: 'nome',
  createdAt: 'createdAt'
};

exports.Prisma.CursoScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  carga_horaria: 'carga_horaria',
  descricao: 'descricao',
  media_minima_aprovacao: 'media_minima_aprovacao',
  frequencia_minima: 'frequencia_minima',
  preco_base: 'preco_base',
  certificateTemplateId: 'certificateTemplateId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.InstrutorScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  email: 'email',
  telefone: 'telefone',
  especialidade: 'especialidade',
  bi_documento: 'bi_documento',
  genero: 'genero',
  bio: 'bio',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TurmaScalarFieldEnum = {
  id: 'id',
  cursoId: 'cursoId',
  codigo_turma: 'codigo_turma',
  data_inicio: 'data_inicio',
  data_fim: 'data_fim',
  instrutorId: 'instrutorId',
  status: 'status',
  vagas: 'vagas',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.MatriculaScalarFieldEnum = {
  id: 'id',
  alunoId: 'alunoId',
  turmaId: 'turmaId',
  media_final: 'media_final',
  percentual_frequencia: 'percentual_frequencia',
  status_academico: 'status_academico',
  valor_total: 'valor_total',
  valor_pago: 'valor_pago',
  estado_pagamento: 'estado_pagamento',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  empresaClienteId: 'empresaClienteId'
};

exports.Prisma.PagamentoScalarFieldEnum = {
  id: 'id',
  matriculaId: 'matriculaId',
  valor: 'valor',
  data: 'data',
  metodo_pagamento: 'metodo_pagamento',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  role: 'role',
  language: 'language',
  theme: 'theme',
  resetToken: 'resetToken',
  resetTokenExpires: 'resetTokenExpires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  usuario: 'usuario',
  acao: 'acao',
  entidade: 'entidade',
  detalhes: 'detalhes',
  createdAt: 'createdAt'
};

exports.Prisma.CertificateTemplateScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  imageUrl: 'imageUrl',
  mapping: 'mapping',
  isDefault: 'isDefault',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CertificateScalarFieldEnum = {
  id: 'id',
  matriculaId: 'matriculaId',
  templateId: 'templateId',
  codigo_unico: 'codigo_unico',
  hash_validacao: 'hash_validacao',
  data_emissao: 'data_emissao',
  createdAt: 'createdAt',
  userId: 'userId'
};

exports.Prisma.AulaScalarFieldEnum = {
  id: 'id',
  turmaId: 'turmaId',
  data: 'data',
  tema: 'tema',
  tipo: 'tipo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PresencaScalarFieldEnum = {
  id: 'id',
  aulaId: 'aulaId',
  alunoId: 'alunoId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AvaliacaoScalarFieldEnum = {
  id: 'id',
  aulaId: 'aulaId',
  matriculaId: 'matriculaId',
  tipo: 'tipo',
  nota: 'nota',
  peso: 'peso',
  instrutorId: 'instrutorId',
  observacao: 'observacao',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DepartamentoScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  descricao: 'descricao',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CargoScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  descricao: 'descricao',
  salario_base: 'salario_base',
  departamentoId: 'departamentoId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FuncionarioScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  bi_documento: 'bi_documento',
  email: 'email',
  telefone: 'telefone',
  data_nascimento: 'data_nascimento',
  genero: 'genero',
  nif: 'nif',
  iban: 'iban',
  numero_inss: 'numero_inss',
  hora_entrada: 'hora_entrada',
  hora_saida: 'hora_saida',
  dias_trabalho: 'dias_trabalho',
  cargoId: 'cargoId',
  departamentoId: 'departamentoId',
  data_admissao: 'data_admissao',
  status: 'status',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContratoScalarFieldEnum = {
  id: 'id',
  funcionarioId: 'funcionarioId',
  tipo: 'tipo',
  data_inicio: 'data_inicio',
  data_fim: 'data_fim',
  renovacao_automatica: 'renovacao_automatica',
  status: 'status',
  salario_base: 'salario_base',
  subsidio_alimentacao: 'subsidio_alimentacao',
  subsidio_transporte: 'subsidio_transporte',
  subsidio_residencia: 'subsidio_residencia',
  outros_subsidios: 'outros_subsidios',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PresencaHRScalarFieldEnum = {
  id: 'id',
  funcionarioId: 'funcionarioId',
  data: 'data',
  entrada: 'entrada',
  saida: 'saida',
  status: 'status',
  horas_normais: 'horas_normais',
  horas_extras_50: 'horas_extras_50',
  horas_extras_100: 'horas_extras_100',
  horas_noturnas: 'horas_noturnas',
  observacao: 'observacao',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FolhaPagamentoScalarFieldEnum = {
  id: 'id',
  funcionarioId: 'funcionarioId',
  mes: 'mes',
  ano: 'ano',
  data_processamento: 'data_processamento',
  salario_base: 'salario_base',
  total_subsidios_tributaveis: 'total_subsidios_tributaveis',
  total_subsidios_isentos: 'total_subsidios_isentos',
  total_horas_extras: 'total_horas_extras',
  total_faltas: 'total_faltas',
  faltas_count: 'faltas_count',
  base_inss: 'base_inss',
  inss_trabalhador: 'inss_trabalhador',
  inss_empresa: 'inss_empresa',
  base_irt: 'base_irt',
  irt_devido: 'irt_devido',
  outros_descontos: 'outros_descontos',
  liquido_receber: 'liquido_receber',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FeriasSolicitacaoScalarFieldEnum = {
  id: 'id',
  funcionarioId: 'funcionarioId',
  data_inicio: 'data_inicio',
  data_fim: 'data_fim',
  dias_uteis: 'dias_uteis',
  ano_referencia: 'ano_referencia',
  tipo: 'tipo',
  status: 'status',
  observacao: 'observacao',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConfigRHScalarFieldEnum = {
  id: 'id',
  mes_referencia: 'mes_referencia',
  ano_referencia: 'ano_referencia',
  salario_minimo: 'salario_minimo',
  inss_trabalhador_pct: 'inss_trabalhador_pct',
  inss_empresa_pct: 'inss_empresa_pct',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmpresaScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  nif: 'nif',
  endereco: 'endereco',
  telefone: 'telefone',
  email: 'email',
  website: 'website',
  logoUrl: 'logoUrl',
  cidade: 'cidade',
  pais: 'pais',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Aluno: 'Aluno',
  EmpresaCliente: 'EmpresaCliente',
  Documento: 'Documento',
  Curso: 'Curso',
  Instrutor: 'Instrutor',
  Turma: 'Turma',
  Matricula: 'Matricula',
  Pagamento: 'Pagamento',
  User: 'User',
  AuditLog: 'AuditLog',
  CertificateTemplate: 'CertificateTemplate',
  Certificate: 'Certificate',
  Aula: 'Aula',
  Presenca: 'Presenca',
  Avaliacao: 'Avaliacao',
  Departamento: 'Departamento',
  Cargo: 'Cargo',
  Funcionario: 'Funcionario',
  Contrato: 'Contrato',
  PresencaHR: 'PresencaHR',
  FolhaPagamento: 'FolhaPagamento',
  FeriasSolicitacao: 'FeriasSolicitacao',
  ConfigRH: 'ConfigRH',
  Empresa: 'Empresa'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
