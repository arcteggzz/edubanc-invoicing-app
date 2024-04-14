export { default as images } from "./images";
export { default as routePaths } from "./routePaths";

export const localStorageKey = `allSavedInvoices`;

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
