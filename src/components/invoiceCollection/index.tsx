import { useSelector } from "react-redux";
import styles from "./InvoiceCollection.module.scss";
import { SingleInvoice } from "..";
import { RootState } from "../../redux/app/store";
import { useEffect, useState } from "react";
import { mainInvoiceType } from "../../types/mainInvoice";
// import { filterControlType } from "../../../redux/features/FilterControls/FiterControlsSlice";

const InvoiceCollection = () => {
  const invoices = useSelector((state: RootState) => state.invoiceSliceReducer);

  const currentView = useSelector(
    (state: RootState) => state.filterControlsSliceReducer.filterControl
  );

  const [invoicesToDisplay, setInvoicesToDisplay] = useState<mainInvoiceType[]>(
    []
  );

  const getTimeofDay = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let timeOfDay;

    if (currentHour >= 6 && currentHour < 12) {
      timeOfDay = "Morning";
    } else if (currentHour >= 12 && currentHour < 16) {
      timeOfDay = "Afternoon";
    } else if (currentHour >= 16 && currentHour < 21) {
      timeOfDay = "Evening";
    } else {
      timeOfDay = "Night";
    }

    return timeOfDay;
  };

  const getTasksToDisplay = () => {
    if (currentView === "All") {
      setInvoicesToDisplay(invoices);
      return;
    }
    if (currentView === "Completed") {
      const completedInvoices = invoices.filter(
        (invoice) => invoice.status === "completed"
      );
      setInvoicesToDisplay(completedInvoices);
      return;
    }
    if (currentView === "Pending") {
      const pendingInvoices = invoices.filter(
        (invoice) => invoice.status === "pending"
      );
      setInvoicesToDisplay(pendingInvoices);
      return;
    }
    if (currentView === "Late") {
      const lateInvoices = invoices.filter(
        (invoice) => invoice.status === "late"
      );
      setInvoicesToDisplay(lateInvoices);
      return;
    }
  };

  useEffect(() => {
    getTasksToDisplay();
  }, [currentView, invoices]);
  return (
    <>
      <section className={styles.InvoiceCollection}>
        {invoices.length === 0 ? (
          <p
            className={styles.not_found_text}
          >{`Good ${getTimeofDay()}, You have not created any invoices yet.`}</p>
        ) : invoicesToDisplay.length === 0 && currentView === "Completed" ? (
          <p
            className={styles.not_found_text}
          >{`Good ${getTimeofDay()}, You do not have any completed Invoices in your inventory. Kindly Reach out to your Clients...`}</p>
        ) : invoicesToDisplay.length === 0 && currentView === "Pending" ? (
          <p
            className={styles.not_found_text}
          >{`Good ${getTimeofDay()}, You do not have any pending Invoices in your inventory.`}</p>
        ) : invoicesToDisplay.length === 0 && currentView === "Late" ? (
          <p
            className={styles.not_found_text}
          >{`Good ${getTimeofDay()}, You do not have any late Invoices in your inventory.`}</p>
        ) : (
          invoicesToDisplay.map((invoice) => {
            return <SingleInvoice key={invoice.id} invoice={invoice} />;
          })
        )}
      </section>
    </>
  );
};

export default InvoiceCollection;
