import styles from "./DeleteAllInvoiceModal.module.scss";
import { useEffect, useRef } from "react";
import { RootState } from "../../redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteAllTaskModal } from "../../redux/features/Modals/ModalsSlice";
import { deleteAllInvoices } from "../../redux/features/Invoices/InvoicesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteAllInvoiceModal = () => {
  let modalRef = useRef<HTMLDivElement>(null);
  const deleteAllTaskModal = useSelector(
    (state: RootState) => state.modalsSliceReducer.deleteAllTaskModal
  );
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  const handleFinalDelete = () => {
    dispatch(deleteAllInvoices());

    toast.success(`All Invoices deleted successfully.`, {
      autoClose: false,
    });

    setTimeout(() => {
      dispatch(closeDeleteAllTaskModal());
    }, 1500);
  };

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      } else {
        if (deleteAllTaskModal) {
          if (!modalRef?.current?.contains(e.target as HTMLDivElement)) {
            dispatch(closeDeleteAllTaskModal());
          }
        }
      }
      // if (createTaskModal) {
      //   if (!modalRef?.current?.contains(e.target as HTMLDivElement)) {
      //     dispatch(closeCreateTaskModal());
      //   }
      // }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      <div className={styles.DeleteAllTaskModal} ref={modalRef}>
        <div className={styles.header}>
          <h1>Are you sure you want to delete all your invoices?</h1>
          <p>
            This will empty your storage completely. You will not be able to
            recover them except you have saved them somewhere else...
          </p>
        </div>

        <div className={styles.btn_container}>
          <button onClick={handleFinalDelete}>Delete All Invoices</button>
          <button onClick={() => dispatch(closeDeleteAllTaskModal())}>
            Cancel
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default DeleteAllInvoiceModal;
