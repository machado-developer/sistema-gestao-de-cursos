# 01 - Database Documentation

## Technical Overview
The system utilizes **MySQL** as the primary relational database, managed through **Prisma ORM**. The schema is designed to support academic management, human resources, and financial tracking with a strong emphasis on auditing and granular access control.

---

## Core Modules & Entities

### 1. Academic Management
| Model | Description |
| :--- | :--- |
| `Aluno` | Stores student personal data, contact info, and B2B affiliation. |
| `Curso` | Defines training programs, workload, and approval criteria. |
| `Turma` | Specific instances of courses with start/end dates and instructors. |
| `Matricula` | The central entity linking Alunos to Turmas, tracking grades and financial status. |
| `Aula` & `Presenca` | Tracks daily attendance and lesson topics. |
| `Avaliacao` | Stores grades for students within a specific enrollment. |
| `Certificate` | Stores issued certificate metadata and verification hashes. |

### 2. Human Resources (RH)
| Model | Description |
| :--- | :--- |
| `Funcionario` | Central HR entity for employees, linked to a System User. |
| `Departamento` & `Cargo` | Organizational structure and job definitions. |
| `Contrato` | Tracks employment history, types, and base salary/subsidies. |
| `PresencaHR` | Employee timesheet (Clocking IN/OUT). |
| `FolhaPagamento` | Monthly payroll processing records. |
| `FeriasSolicitacao` | Leave management system. |
| `AdiantamentoSalario` & `Desconto` | Advance payments and deductions tracking. |

### 3. Identity and Access Management (IAM)
| Model | Description |
| :--- | :--- |
| `User` | Authentication identity for the system. |
| `Profile` | RBAC (Role-Based Access Control) groups. |
| `Module` & `ModuleItem` | Definitions of protected areas in the application. |
| `Permission` entities | Granular cross-reference between Users/Profiles and Modules/Items. |

---

## Entity-Relationship (ER) Overview

### Key Relationships
- **Aluno 1:N Matricula**: A student can have multiple enrollments over time.
- **Turma 1:N Matricula**: A class group contains multiple student enrollments.
- **Funcionario 1:1 User**: Employees are optionally linked to a system user for access.
- **Curso 1:N Turma**: A course curriculum can have multiple class instances.
- **Matricula 1:N Pagamento**: Fees can be paid in installments.

### Critical Integrity Constraints
1. **Fiscal Tracking**: `Matricula.valor_total` and `Matricula.valor_pago` are the base for revenue reporting.
2. **Academic Progress**: `Status_academico` is derived from `Avaliacao` and `Presenca` constraints.
3. **Audit Trail**: Most critical operations are logged in `AuditLog` with serialized JSON details.

---

## Detailed Model Specification (Selection of Critical Entities)

### Model: `Matricula` (The Pivot Entity)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Yes | Primary Key. |
| `alunoId` | UUID | Yes | FK to Aluno. |
| `turmaId` | UUID | Yes | FK to Turma. |
| `media_final` | Float | No | Calculated average from Avaliacoes. |
| `status_academico` | String | Yes | Cursando, Aprovado, Reprovado. |
| `valor_total` | Decimal | Yes | Total cost of the course for this student. |
| `valor_pago` | Decimal | Yes | Accumulated payments. |
| `estado_pagamento` | String | Yes | Pendente, Parcial, Pago, Isento. |

### Model: `FolhaPagamento` (Financial Integrity)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Yes | Primary Key. |
| `funcionarioId` | UUID | Yes | FK to Funcionario. |
| `mes` / `ano` | Int | Yes | Temporal reference for payroll. |
| `liquido_receber` | Decimal | Yes | Final amount to be paid after taxes/descontos. |
| `base_inss` / `base_irt` | Decimal | Yes | Calculated tax bases according to Angolan law. |

---

## Multi-Tenant Strategy
The system implements a **Semi-Isolated Multi-Company** logic:
- `Empresa` (Internal): Defines the main institution's identity (NIF, Logo) used in document headers.
- `EmpresaCliente` (External): Supports B2B contracts, where students are linked to a client company for bulk billing and reporting.

## Identity and Audit
- `AuditLog`: Captures `acao`, `entidade`, and a JSON diff of `detalhes`.
- `EmailJob`: Asynchronous queue for processing document delivery (Salary Slips, etc.).
