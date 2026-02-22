# 02 - Modules Documentation

This document describes the functional modules of the system, their responsibilities, and the underlying business logic.

---

## 1. Academic Management Module
**Objective**: Manage the lifecycle of training programs, from student enrollment to certificate issuance.

### Core Components:
- **Student Management**: Registration of personal and B2B data (`Aluno`).
- **Course & Curriculum**: Defining workload, pricing, and approval rules (`Curso`).
- **Class Implementation**: Scheduling and instructor assignment (`Turma`).
- **Enrollment Flow**: Linking students to classes with automated financial balance checks (`Matricula`).
- **Academic Performance**: Grade entry, automated average calculation, and attendance tracking (`Avaliacao`, `Presenca`).
- **Certification**: Generation of digital certificates with unique verification hashes (`Certificate`).

---

## 2. Human Resources (RH) Module
**Objective**: Manage organizational structure, employee lifecycle, and payroll processing.

### Core Components:
- **Employee Registry**: Detailed records including INSS, NIF, and IBAN (`Funcionario`).
- **Organizational Structure**: Multi-department and job title hierarchy (`Departamento`, `Cargo`).
- **Contract Management**: Tracking employment types and salary components (Base + Subsidies) (`Contrato`).
- **Timesheet Management**: Monitoring employee clock-ins and outs, including overtime calculation (`PresencaHR`).
- **Payroll (Monthly)**: Automated calculation of taxes (IRT, INSS) and net salary. Support for re-processing and historical records (`FolhaPagamento`).
- **Benefit & Deduction Flow**: Integration of advance requests and disciplinary or absence-related deductions.

---

## 3. Financial & Payment Module
**Objective**: Tracking revenue from training services and managing financial health.

### Core Components:
- **Enrollment Payments**: Recording installments against the total course fee (`Pagamento`).
- **Balance Tracking**: Automated "Pending/Partial/Paid" status updates based on registered payments.
- **Reporting**: Basic revenue dashboards by course and date ranges.

---

## 4. Identity & Access Management (IAM)
**Objective**: Secure the system through granular Role-Based Access Control (RBAC).

### Core Components:
- **User Authentication**: Secure login via NextAuth.
- **Role Profiles**: Group-level permissions (`Profile`).
- **Granular Permissions**: Module-level and Item-level Read/Write control for Users and Profiles.
- **Audit System**: Logging of all sensitive operations with actor identification and data diffs (`AuditLog`).

---

## 5. Automated Jobs & Communications
**Objective**: Handle asynchronous tasks and document delivery.

### Core Components:
- **Email Worker**: Background processing of outgoing emails (Salary slips, credentials).
- **Notification Queue**: Managing `EmailJob` statuses (Pending, Processing, Completed, Failed).
