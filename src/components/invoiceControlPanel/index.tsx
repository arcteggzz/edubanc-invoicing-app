import { useSelector, useDispatch } from "react-redux";
import styles from "./InvoiceControlPanel.module.scss";
import { RootState } from "../../redux/app/store";
import {
  viewAll,
  viewCompleted,
  viewPending,
  viewLate,
} from "../../redux/features/FilterControls/FiterControlsSlice";

const InvoiceControlPanel = () => {
  const dispatch = useDispatch();

  const allInvoices = useSelector(
    (state: RootState) => state.invoiceSliceReducer
  );

  const completedInvoices = useSelector((state: RootState) =>
    state.invoiceSliceReducer.filter(
      (invoice) => invoice.status === "completed"
    )
  );

  const pendingInvoices = useSelector((state: RootState) =>
    state.invoiceSliceReducer.filter((invoice) => invoice.status === "pending")
  );

  const lateInvoices = useSelector((state: RootState) =>
    state.invoiceSliceReducer.filter((invoice) => invoice.status === "late")
  );

  const currentView = useSelector(
    (state: RootState) => state.filterControlsSliceReducer.filterControl
  );

  return (
    <>
      <section className={styles.InvoiceControlPanel}>
        <div className={styles.TaskManager_controls}>
          <button
            className={
              currentView === "All" ? styles.active_btn : styles.show_all_btn
            }
            onClick={() => dispatch(viewAll())}
          >
            Show All
          </button>
          <button
            className={
              currentView === "Completed"
                ? styles.active_btn
                : styles.completed_btn
            }
            onClick={() => dispatch(viewCompleted())}
          >
            Completed
          </button>
          <button
            className={
              currentView === "Pending" ? styles.active_btn : styles.pending_btn
            }
            onClick={() => dispatch(viewPending())}
          >
            Pending
          </button>
          <button
            className={
              currentView === "Late" ? styles.active_btn : styles.late_btn
            }
            onClick={() => dispatch(viewLate())}
          >
            Late
          </button>
        </div>

        <div className={styles.TaskManager_details}>
          <div className={styles.text_box}>
            <h4>All:</h4>
            <p>{`${allInvoices.length}`}</p>
          </div>
          <div className={styles.text_box}>
            <h4>Completed:</h4>
            <p> {`${completedInvoices.length}`}</p>
          </div>
          <div className={styles.text_box}>
            <h4>Pending:</h4>
            <p>{`${pendingInvoices.length}`}</p>
          </div>
          <div className={styles.text_box}>
            <h4>Late:</h4>
            <p>{`${lateInvoices.length}`}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvoiceControlPanel;
