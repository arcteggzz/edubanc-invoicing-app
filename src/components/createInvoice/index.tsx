import styles from "./CreateInvoice.module.scss";
import {
  openCreateTaskModal,
  openDeleteAllTaskModal,
} from "../../redux/features/Modals/ModalsSlice";
import { useDispatch } from "react-redux";

const CreateInvoice = () => {
  const dispatch = useDispatch();

  return (
    <>
      <main className={styles.CreateInvoice}>
        <div className={styles.Header}>
          <h1>Edubanc Invoice Manager</h1>
          <p>
            Manage your invoices at a glance. Create, Print, Edit and Delete as
            you please.
          </p>
        </div>

        <div className={styles.buttons_container}>
          <button
            onClick={() => dispatch(openCreateTaskModal())}
            className={styles.new_btn}
          >
            Create New Invoice
          </button>

          <button
            onClick={() => dispatch(openDeleteAllTaskModal())}
            className={styles.del_btn}
          >
            Delete All Invoices
          </button>
        </div>
      </main>
    </>
  );
};

export default CreateInvoice;
