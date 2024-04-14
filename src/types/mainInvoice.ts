import { singleInvoiceDetailType } from "./singleInvoiceDetail";

export type mainInvoiceType = {
  id: number;
  dateCreated: string;
  clientDetails: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
  };
  paymentDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  invoiceItems: singleInvoiceDetailType[];
  grandTotal: number;
  status: "completed" | "pending" | "late";
};
