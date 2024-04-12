import styles from "./SingleInvoice.module.scss";
import { images } from "../../utils";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTask,
} from "../../redux/features/Tasks/TasksSilce";
import {
  openEditTaskModal,
  setEditModalDetails,
} from "../../redux/features/Modals/ModalsSlice";

type SingleTaskProp = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const SingleInvoice = ({
  title,
  description,
  completed,
  id,
}: SingleTaskProp) => {
  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    dispatch(toggleComplete({ id: id, completed: !completed }));
  };
  const handleDelete = (num: number) => {
    dispatch(deleteTask({ id: num }));
  };
  const handleEdit = () => {
    dispatch(
      setEditModalDetails({
        oldDescription: description,
        oldId: id,
        oldTitle: title,
      })
    );
    dispatch(openEditTaskModal());
  };

  return (
    <>
      <article className={styles.SingleInvoice}>
        <div
          className={styles.completed_container}
          onClick={() => handleCompleteClick()}
        >
          <img
            src={
              completed ? images.completeCheckmark : images.incompleteCheckmark
            }
            alt={completed ? "complete icon" : "incomplete icon"}
          />
        </div>
        <div className={styles.title_container}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <div className={styles.buttons_container}>
          <button className={styles.edit_btn} onClick={() => handleEdit()}>
            Edit
          </button>
          <button
            className={styles.delete_btn}
            onClick={() => handleDelete(id)}
          >
            Del
          </button>
        </div>
      </article>
    </>
  );
};

export default SingleInvoice;
