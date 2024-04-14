import styles from "./EditStatusModal.module.scss";
import { useEffect, useRef } from "react";
import { RootState } from "../../redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditInvoiceStatusModal,
  clearEditInvoiceStatusId,
} from "../../redux/features/Modals/ModalsSlice";
import { images } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateInvoiceStatus } from "../../redux/features/Invoices/InvoicesSlice";

const EditStatusModal = () => {
  const dispatch = useDispatch();

  const editStatusModal = useSelector(
    (state: RootState) => state.modalsSliceReducer.editInvoiceStatusModal
  );

  const editStatusId = useSelector((state: RootState) => {
    return state.modalsSliceReducer.editInvoiceStatusId;
  });

  const allInvoices = useSelector((state: RootState) => {
    return state.invoiceSliceReducer;
  });

  const currentInvoice = allInvoices.find(
    (invoice) => invoice.id === (editStatusId as number)
  );

  let modalRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  const handleUpdateStatusComplete = () => {
    dispatch(updateInvoiceStatus({ id: editStatusId, status: "completed" }));
    toast.success(`Invoice Status updated successfully.`, { autoClose: false });
  };

  const handleUpdateStatusPending = () => {
    dispatch(updateInvoiceStatus({ id: editStatusId, status: "pending" }));
    toast.success(`Invoice Status updated successfully.`, { autoClose: false });
  };

  const handleUpdateStatusLate = () => {
    dispatch(updateInvoiceStatus({ id: editStatusId, status: "late" }));
    toast.success(`Invoice Status updated successfully.`, { autoClose: false });
  };

  //close the model when they click outside the box
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      } else {
        if (editStatusModal) {
          if (!modalRef?.current?.contains(e.target as HTMLDivElement)) {
            dispatch(closeEditInvoiceStatusModal());
            dispatch(clearEditInvoiceStatusId());
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      <div className={styles.EditStatusModal} ref={modalRef}>
        <div className={styles.header}>
          <h1>Edit the Status of your Invoice...</h1>
          <p>
            Mark status as complete if the client has paid fully, Mark as
            pending if there is an outstanding amount, mark as late if the due
            date has elapsed.
          </p>
        </div>

        <div className={styles.invoice_details}>
          <h4>
            Invoice Date: {currentInvoice ? currentInvoice.dateCreated : ""}
          </h4>
          <h4>
            Client Name:{" "}
            {currentInvoice ? currentInvoice.clientDetails.clientName : ""}
          </h4>
        </div>

        <div className={styles.btn_container}>
          <button
            className={styles.complete_btn}
            onClick={handleUpdateStatusComplete}
          >
            Mark as Complete
          </button>
          <button
            className={styles.pending_btn}
            onClick={handleUpdateStatusPending}
          >
            Mark as Pending
          </button>
          <button className={styles.late_btn} onClick={handleUpdateStatusLate}>
            Mark as Late
          </button>
        </div>

        <button
          className={styles.close_button}
          onClick={() => {
            dispatch(closeEditInvoiceStatusModal());
          }}
        >
          Close
        </button>
        <ToastContainer />

        <div className={styles.mobile_message}>
          <img src={images.broken} alt="" />
          <h2>
            Sorry... At this moment, you can only edit invoices from a desktop
            device.
          </h2>

          <button
            className={styles.mobile_close_button}
            onClick={() => {
              dispatch(closeEditInvoiceStatusModal());
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default EditStatusModal;
