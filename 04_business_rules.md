# 04 - Business Rules

This document consolidates the key logic, constraints, and operational rules implemented across the system.

---

## 1. Academic & Certification Rules
- **Approval Logic**: A student is only "Aprovado" if the Final Average is $\ge 10.0$ AND Attendance is $\ge 75\%$.
- **Certificate Eligibility**: Certificates can only be issued for students with "Aprovado" status.
- **Course Pricing**: The `preco_base` of a course acts as the default `valor_total` in a `Matricula`, but can be manually overridden at the time of enrollment.
- **Unique Coding**: Each certificate must have a unique alphanumeric code and a SHA-256 validation hash for external verification.

---

## 2. Financial & Payment Rules
- **Payment Cap**: A payment (`Pagamento`) cannot exceed the current pending balance of a `Matricula`.
- **Status Progression**:
  - `Pendente`: No payment registered.
  - `Parcial`: Sum of payments $<$ Total value.
  - `Pago`: Sum of payments $\ge$ Total value.
- **B2B Billing**: Invoices/Reports can be grouped by `EmpresaCliente` for bulk payment tracking.

---

## 3. Human Resources & Payroll Rules
- **Tax Calculation (Angola)**:
  - **INSS (Trabalhador)**: 3% deducted from gross salary.
  - **INSS (Empresa)**: 8% responsibility of the employer.
  - **IRT**: Calculated on the tax base after INSS deduction, using the official progressive tax table.
- **Time Clock Validation**: Employee attendance status is derived from entry/exit times vs. the theoretical 8-hour workday.
- **Timesheet to Payroll**: Hours recorded in `PresencaHR` (including overtime 50%/100%) are the source of truth for the monthly `FolhaPagamento`.
- **Payroll Recalculation**: `FolhaPagamento` records can be re-processed if the status is "PROCESSADO". Once marked as "PAGO", the record is immutable.
- **Discount Accumulation**: New deductions ("APROVADO") requested after a payroll run will be combined with previous deductions ("PROCESSADO") when re-running the same month.

---

## 4. Security & Audit Rules
- **Mutation Logging**: Any `POST`, `PUT`, or `DELETE` on sensitive modules (Matriculas, RH, Financeiro) MUST be wrapped in the `withAudit` middleware, capturing the actor and data diff.
- **RBAC Hierarchy**: A `User` inherits permissions from their assigned `Profile` (Group), but can have "Individual Overrides" directly linked to their user account.
- **Module Lockdown**: Attempting to access an API route without the `Read` permission for that specific `ModuleKey` results in a `403 Forbidden` response.
- **Email Security**: Sensitive documents (Salary Slips) are delivered via a background queue (`EmailJob`) to ensure the primary transaction is not delayed by SMTP latency.
