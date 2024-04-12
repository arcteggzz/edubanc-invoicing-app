import styles from "./CreateNewInvoiceModal.module.scss";
import { FormEvent, useEffect, useState, useRef } from "react";
import { RootState } from "../../redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateTaskModal } from "../../redux/features/Modals/ModalsSlice";
import { addnewTask } from "../../redux/features/Tasks/TasksSilce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewInvoiceModal = () => {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  let modalRef = useRef<HTMLFormElement>(null);
  const createTaskModal = useSelector(
    (state: RootState) => state.modalsSliceReducer.createTaskModal
  );
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (titleText.trim() === "" || descriptionText.trim() === "") {
      alert("Kindly Add a Title and Description.");
      return;
    }

    const newTask = {
      title: titleText,
      description: descriptionText,
    };

    dispatch(addnewTask(newTask));
    setDescriptionText("");
    setTitleText("");
    toast.success(`${titleText} created successfully.`, { autoClose: false });
    setTimeout(() => {
      dispatch(closeCreateTaskModal());
    }, 2000);
  };

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      } else {
        if (createTaskModal) {
          if (!modalRef?.current?.contains(e.target as HTMLDivElement)) {
            dispatch(closeCreateTaskModal());
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
          <h1>Create A New Task</h1>
          <p>Fill in the required fields</p>
        </div>
        <div className={styles.form_body}>
          <div className={styles.form_fiels}>
            <div className={styles.title}>
              <label htmlFor="Title">Title</label>
              <input
                type="text"
                id="Title"
                required
                placeholder="Enter Title"
                onChange={(e) => setTitleText(e.target.value)}
                value={titleText}
              />
            </div>
            <div className={styles.title}>
              <label htmlFor="Description">Description</label>
              <input
                type="text"
                id="Description"
                required
                placeholder="Enter Description"
                onChange={(e) => setDescriptionText(e.target.value)}
                value={descriptionText}
              />
            </div>
          </div>
          <button>Create</button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default CreateNewInvoiceModal;
