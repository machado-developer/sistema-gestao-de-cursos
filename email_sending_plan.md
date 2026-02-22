# Email Editing & Sending for Receipts

The user wants to be able to edit employee emails before sending salary receipts and have the option to send them individually or in bulk.

## Proposed Changes

### [RH Module]

#### [MODIFY] [bulk-email API route](file:///c:/Users/anton/Documents/NewTech/gestao/src/app/api/rh/folhas/bulk-email/route.ts)
- Update to accept an optional `recipients` array of `{ folhaId: string, email: string }`.
- Use the provided email in the `emailJob` payload instead of strictly relying on the database version.

#### [NEW] [EmailRecipientsModal.tsx](file:///c:/Users/anton/Documents/NewTech/gestao/src/components/rh/EmailRecipientsModal.tsx)
- Create a modal that lists selected employees.
- Provide input fields to edit their email addresses.
- "Confirm & Send" button to trigger the API.

#### [MODIFY] [ProcessamentoPage.tsx](file:///c:/Users/anton/Documents/NewTech/gestao/src/app/(admin)/rh/processamento/page.tsx)
- Add a new "Email" icon button to each row in the table (for individual sending).
- Update `handleSendBulkEmail` to open the `EmailRecipientsModal` instead of sending directly.
- Pass the selected employees' data to the modal.

## Verification Plan

### Manual Verification
1. Select multiple employees in the payroll list.
2. Click "ENVIAR" (Submit).
3. Verify that a modal appears showing the list of employees and their emails.
4. Edit one of the emails to a test email address.
5. Click "Confirmar Envio".
6. Check the database/logs to verify the `EmailJob` was created with the edited email.
7. Repeat for an individual employee using the row action.
