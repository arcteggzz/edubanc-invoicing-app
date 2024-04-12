import styles from "../createNewInvoiceModal/CreateNewInvoiceModal.module.scss";
import { FormEvent, useEffect, useState, useRef } from "react";
import { RootState } from "../../redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditaskModal,
  clearEditModalDetails,
} from "../../redux/features/Modals/ModalsSlice";
import { editTask } from "../../redux/features/Tasks/TasksSilce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditInvoiceModal = () => {
  const oldDetails = useSelector((state: RootState) => {
    return state.modalsSliceReducer.editModalDetails;
  });

  const [newTitleText, setNewTitleText] = useState(oldDetails.oldTitle);
  const [newDescriptionText, setNewDescriptionText] = useState(
    oldDetails.oldDescription
  );
  let modalRef = useRef<HTMLFormElement>(null);
  const editTaskModal = useSelector(
    (state: RootState) => state.modalsSliceReducer.editTaskModal
  );
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTitleText.trim() === "" || newDescriptionText.trim() === "") {
      alert("Kindly Add a Title and Description.");
      return;
    }

    const updatedTask = {
      id: oldDetails.oldId,
      newTitle: newTitleText,
      newDescription: newDescriptionText,
    };

    dispatch(editTask(updatedTask));
    setNewDescriptionText("");
    setNewTitleText("");
    dispatch(clearEditModalDetails());
    toast.success(`task updated successfully.`, { autoClose: false });
    setTimeout(() => {
      dispatch(closeEditaskModal());
    }, 2000);
  };

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      } else {
        if (editTaskModal) {
          if (!modalRef?.current?.contains(e.target as HTMLDivElement)) {
            dispatch(closeEditaskModal());
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
      <form
        className={styles.CreateNewInvoiceModal}
        onSubmit={(event: FormEvent) => handleSubmit(event)}
        ref={modalRef}
      >
        <div className={styles.header}>
          <h1>Edit Task</h1>
          <p>Fill in the required fields</p>
        </div>
        <div className={styles.form_body}>
          <div className={styles.form_fiels}>
            <div className={styles.title}>
              <label htmlFor="newTitle">New Title</label>
              <input
                type="text"
                id="newTitle"
                required
                placeholder="Enter New Title"
                onChange={(e) => setNewTitleText(e.target.value)}
                value={newTitleText}
              />
            </div>
            <div className={styles.title}>
              <label htmlFor="Description">New Description</label>
              <input
                type="text"
                id="newDescription"
                required
                placeholder="Enter New Description"
                onChange={(e) => setNewDescriptionText(e.target.value)}
                value={newDescriptionText}
              />
            </div>
          </div>
          <button>Edit Task</button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default EditInvoiceModal;
