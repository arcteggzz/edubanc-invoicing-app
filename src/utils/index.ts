export { default as images } from "./images";
export { default as routePaths } from "./routePaths";
import { mainInvoiceType } from "../types/mainInvoice";

export const localStorageKey = `allSavedInvoices`;
export const hasDeletedAllInvoicesBeforeKey = `hasDeletedAllInvoicesBefore`;

export const capitalizeFirstLetter = (word: string) => {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return "";
};

export const getTodayDate = () => {
  // Get today's date
  const today = new Date();

  // Get the day, month, and year
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = String(today.getFullYear()).slice(-2); // Get the last 2 digits of the year

  // Format the date as DD/MM/YY
  return `${day}/${month}/${year}`;
};

export const presetInvoices: mainInvoiceType[] = [
  {
    clientDetails: {
      clientName: "Oghenetega Esedere",
      clientEmail: "arcteggzz@gmail.com",
      clientPhone: "88888888",
    },
    paymentDetails: {
      bankName: "Sterling Bank",
      accountName: "Oghenetega",
      accountNumber: "240556689",
    },
    invoiceItems: [
      {
        id: 0,
        itemDescription: "Floor Plan",
        itemPrice: 20000,
        itemQuantity: 2,
        itemTotal: 40000,
      },
      {
        id: 1,
        itemDescription: "Section",
        itemPrice: 10000,
        itemQuantity: 8,
        itemTotal: 80000,
      },
    ],
    grandTotal: 120000,
    dateCreated: "14/04/24",
    id: 1713096484382,
    status: "late",
  },
  {
    clientDetails: {
      clientName: "Onajite Esedere",
      clientEmail: "onajite@gmail.com",
      clientPhone: "07088478400",
    },
    paymentDetails: {
      bankName: "Sterling Bank",
      accountName: "Onajite Enterprises",
      accountNumber: "0172244841",
    },
    invoiceItems: [
      {
        id: 0,
        itemDescription: "Photo Session",
        itemPrice: 200000,
        itemQuantity: 1,
        itemTotal: 200000,
      },
      {
        id: 1,
        itemDescription: "Retouching",
        itemPrice: 450000,
        itemQuantity: 5,
        itemTotal: 2250000,
      },
      {
        id: 2,
        itemDescription: "Panning and Others",
        itemPrice: 250000,
        itemQuantity: 1,
        itemTotal: 250000,
      },
    ],
    grandTotal: 2700000,
    dateCreated: "14/04/24",
    id: 1713107072907,
    status: "pending",
  },
  {
    clientDetails: {
      clientName: "Onome Esedere",
      clientEmail: "profkelvin!@gmail.com",
      clientPhone: "08030757571",
    },
    paymentDetails: {
      bankName: "Edubanc",
      accountName: "Tiara",
      accountNumber: "999999555",
    },
    invoiceItems: [
      {
        id: 0,
        itemDescription: "Project Management",
        itemPrice: 600000,
        itemQuantity: 2,
        itemTotal: 1200000,
      },
      {
        id: 1,
        itemDescription: "Dicing",
        itemPrice: 450000,
        itemQuantity: 1,
        itemTotal: 450000,
      },
    ],
    grandTotal: 1650000,
    dateCreated: "14/04/24",
    id: 1713107151292,
    status: "completed",
  },
];
