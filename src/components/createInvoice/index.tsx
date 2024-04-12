import styles from "./CreateInvoice.module.scss";
import { openCreateTaskModal } from "../../redux/features/Modals/ModalsSlice";
import { useDispatch } from "react-redux";

const CreateInvoice = () => {
  const dispatch = useDispatch();

  return (
    <>
      <main className={styles.CreateInvoice}>
        <div className={styles.Header}>
          <h1>Personal Task Manager</h1>
          <p>
            Manage your tasks at a glance. Create, Update, Edit and Delete as
            you please
          </p>
        </div>

        <button onClick={() => dispatch(openCreateTaskModal())}>
          Create New Task
        </button>
      </main>
    </>
  );
};

export default CreateInvoice;
