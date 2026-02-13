import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { SalarySlipPDF } from "@/components/rh/SalarySlipPDF";

export class ServerDocumentService {
    static async generateSalarySlipPDF(data: any): Promise<Buffer> {
        try {
            const doc = React.createElement(SalarySlipPDF, { data });
            const buffer = await renderToBuffer(doc as any);
            return buffer;
        } catch (error) {
            console.error("Error generating PDF on server:", error);
            throw error;
        }
    }
}
