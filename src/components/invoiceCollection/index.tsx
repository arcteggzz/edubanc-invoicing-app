import { useSelector } from "react-redux";
import styles from "./InvoiceCollection.module.scss";
import { SingleInvoice } from "..";
import { RootState } from "../../redux/app/store";
import { useEffect, useState } from "react";
import { singleTaskType } from "../../types/Tasks";
// import { filterControlType } from "../../../redux/features/FilterControls/FiterControlsSlice";

const InvoiceCollection = () => {
  const tasks = useSelector((state: RootState) => state.tasksSliceReducer);
  const currentView = useSelector(
    (state: RootState) => state.filterControlsSliceReducer.filterControl
  );
  const [tasksToDisplay, setTasksDisplay] = useState<singleTaskType[]>([]);

  const getTimeofDay = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let timeOfDay;

    if (currentHour >= 6 && currentHour < 12) {
      timeOfDay = "Morning";
    } else if (currentHour >= 12 && currentHour < 16) {
      timeOfDay = "Afternoon";
    } else if (currentHour >= 16 && currentHour < 21) {
      timeOfDay = "Evening";
    } else {
      timeOfDay = "Night";
    }

    return timeOfDay;
  };

  const getTasksToDisplay = () => {
    if (currentView === "All") {
      setTasksDisplay(tasks);
      return;
    }
    if (currentView === "Completed") {
      const completedTasks = tasks.filter((task) => task.completed === true);
      setTasksDisplay(completedTasks);
      return;
    }
    if (currentView === "Pending") {
      const pendingTasks = tasks.filter((task) => task.completed !== true);
      setTasksDisplay(pendingTasks);
      return;
    }
  };

  useEffect(() => {
    getTasksToDisplay();
  }, [currentView, tasks]);
  return (
    <>
      <main className={styles.InvoiceCollection}>
        {tasks.length === 0 ? (
          <p
            className={styles.not_found_text}
          >{`Good ${getTimeofDay()}, You have not created any tasks yet.`}</p>
        ) : tasksToDisplay.length === 0 && currentView === "Completed" ? (
          <p
            className={styles.not_found_text}
          >{`Good ${getTimeofDay()}, You have not completed any tasks yet. Get to work.`}</p>
        ) : tasksToDisplay.length === 0 && currentView === "Pending" ? (
          <p
            className={styles.not_found_text}
          >{`Good ${getTimeofDay()}, You have completed all your tasks. Great Job.`}</p>
        ) : (
          tasksToDisplay.map((task) => {
            return (
              <SingleInvoice
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
              />
            );
          })
        )}
      </main>
    </>
  );
};

export default InvoiceCollection;
