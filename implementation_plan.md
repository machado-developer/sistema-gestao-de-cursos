# Implementation Plan - Academic Management Fixes

This plan addresses the bug where class status changes are ignored and improves the student approval logic during class finalization.

## Proposed Changes

### [Library]

#### [MODIFY] [schemas.ts](file:///c:/Users/anton/Documents/NewTech/gestao/src/lib/schemas.ts)
- Add `status: z.string().optional()` to `turmaSchema`.

### [Services]

#### [MODIFY] [turmaService.ts](file:///c:/Users/anton/Documents/NewTech/gestao/src/services/turmaService.ts)
- Update `concluirTurma` and `checkAndFinalizeExpiredTurmas` to consider both `media_final` and `percentual_frequencia` for student approval.

### [API Routes]

#### [MODIFY] [route.ts](file:///c:/Users/anton/Documents/NewTech/gestao/src/app/api/turmas/[id]/route.ts)
- Update `PUT` handler to:
    - Save the `status` field.
    - Call `turmaService.concluirTurma(id)` if the new status is "Concluída".

## Verification Plan

### Automated Tests
- I will verify the schema change by checking if it accepts the `status` field.
- I will check the service logic to ensure it uses both media and frequency.

### Manual Verification
- Admin can navigate to a class page, click "Finalizar Turma", and verify that students are approved/reproved based on BOTH grades and attendance.

---

## [RH & Payroll]

### [MODIFY] [rhService.ts](file:///c:/Users/anton/Documents/NewTech/gestao/src/services/rhService.ts)
- Modify `processarFolhaMensal`:
    - Remove the global month/year check.
    - Check if a payroll record already exists **per employee** before processing.
    - Wrap the processing loop in a `prisma.$transaction`.

## [Certificates]

### [MODIFY] [certificateService.ts](file:///c:/Users/anton/Documents/NewTech/gestao/src/services/certificateService.ts)
- Optimize bulk emission to reduce redundant database calls.

## Verification Plan

### Automated Tests
- Test payroll processing for multiple employees and verify that adding a new employee later doesn't block the whole month.
- Verify that a failure mid-process rolls back all changes in the payroll transaction.

### Manual Verification
- Process payroll for a group of employees.
- Add a new employee and attempt to process again for the same month - it should only process the new employee.
