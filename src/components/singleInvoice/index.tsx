import styles from "./SingleInvoice.module.scss";
import { useDispatch } from "react-redux";
import { deleteInvoce } from "../../redux/features/Invoices/InvoicesSlice";
import StatusText from "../statusText";
import {
  openEditInvoiceStatusModal,
  setEditInvoiceStatusId,
  openViewTaskModal,
  setViewInvoiceId,
} from "../../redux/features/Modals/ModalsSlice";
import { mainInvoiceType } from "../../types/mainInvoice";

type SingleTaskProp = {
  invoice: mainInvoiceType;
};

const SingleInvoice = ({ invoice }: SingleTaskProp) => {
  const dispatch = useDispatch();

  const handleDelete = (num: number) => {
    dispatch(deleteInvoce({ id: num }));
  };

  const handleEdit = () => {
    dispatch(setEditInvoiceStatusId({ id: invoice.id }));
    dispatch(openEditInvoiceStatusModal());
  };

  const handleView = () => {
    dispatch(setViewInvoiceId({ id: invoice.id }));
    dispatch(openViewTaskModal());
  };

  return (
    <>
      <article className={styles.SingleInvoice}>
        <div className={styles.title_container}>
          <h4>{invoice.clientDetails.clientName}</h4>
          <div className={styles.details_container}>
            <p>{invoice.clientDetails.clientEmail}</p>
          </div>
        </div>

        <div className={styles.status_text_container}>
          <StatusText text={invoice.status} />
        </div>

        <h4
          className={styles.total_text}
        >{`$${invoice.grandTotal.toLocaleString()}`}</h4>

        <div className={styles.mobile_details}>
          <StatusText text={invoice.status} />

          <h4
            className={styles.mobile_total_text}
          >{`$${invoice.grandTotal.toLocaleString()}`}</h4>
        </div>

        <div className={styles.buttons_container}>
          <button className={styles.edit_btn} onClick={() => handleView()}>
            View
          </button>
          <button className={styles.edit_btn} onClick={() => handleEdit()}>
            Edit
          </button>
          <button
            className={styles.delete_btn}
            onClick={() => handleDelete(invoice.id)}
          >
            Del
          </button>
        </div>
      </article>
    </>
  );
};

export default SingleInvoice;
