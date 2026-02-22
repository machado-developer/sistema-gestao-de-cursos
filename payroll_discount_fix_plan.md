# Payroll Re-processing & Discount Fixing

The current implementation has a bug when re-processing a month's payroll:
1. It skips employees with `status: "PROCESSADO"`, preventing updates after adding new discounts.
2. It only sums up `APROVADO` discounts. If re-processed, it would replace the previous total with ONLY the new discounts, effectively "losing" the ones already marked as `PROCESSADO`.

## Proposed Changes

### [RH Module]

#### [MODIFY] [rhService.ts](file:///c:/Users/anton/Documents/NewTech/gestao/src/services/rhService.ts)
- Update `processarFolhaMensal`:
    - Allow re-processing of employees with `status: "PROCESSADO"` (but still skip `PAGO`).
    - Change queries for `Descontos` and `AdiantamentoSalario` to include both `APROVADO` and `PROCESSADO` statuses for the target month/year.
    - This ensures that if you add a new discount and re-run, the `FolhaPagamento` record reflects the correct SUM of all discounts for that month.

## Verification Plan

### Manual Verification
1. Process payroll for an employee.
2. Verify they have 1 discount of 1000 accounted for.
3. Add a NEW discount of 500 for the same month.
4. Re-run "EXECUTAR" for that month.
5. Verify the employee's `FolhaPagamento` now shows 1500 in `outros_descontos` and the net salary is updated correctly.
