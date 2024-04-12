import { useSelector, useDispatch } from "react-redux";
import styles from "./InvoiceControlPanel.module.scss";
import { RootState } from "../../redux/app/store";
import {
  viewAll,
  viewCompleted,
  viewPending,
} from "../../redux/features/FilterControls/FiterControlsSlice";

const InvoiceControlPanel = () => {
  const dispatch = useDispatch();
  const completedTasks = useSelector((state: RootState) =>
    state.tasksSliceReducer.filter((task) => task.completed === true)
  );
  const allTasks = useSelector((state: RootState) => state.tasksSliceReducer);
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
        </div>
        <div className={styles.TaskManager_details}>
          <div className={styles.text_box}>
            <h4>All:-</h4>
            <p>{`${allTasks.length} Items`}</p>
          </div>
          <div className={styles.text_box}>
            <h4>Completed:-</h4>
            <p> {`${completedTasks.length} Items`}</p>
          </div>
          <div className={styles.text_box}>
            <h4>Pending:-</h4>
            <p>{`${allTasks.length - completedTasks.length} Items`}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvoiceControlPanel;
