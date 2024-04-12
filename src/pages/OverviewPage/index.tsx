import styles from "./OverviewPage.module.scss";
import {
  EditInvoiceModal,
  CreateInvoice,
  CreateNewInvoiceModal,
  InvoiceCollection,
  InvoiceControlPanel,
} from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

const OverviewPage = () => {
  const createTaskModalOpen = useSelector(
    (state: RootState) => state.modalsSliceReducer.createTaskModal
  );
  const editTaskModalOpen = useSelector(
    (state: RootState) => state.modalsSliceReducer.editTaskModal
  );

  return (
    <>
      <main className={styles.OverviewPage}>
        <div className={styles.Container}>
          <CreateInvoice />
          <InvoiceCollection />
          <InvoiceControlPanel />
        </div>
        {createTaskModalOpen ? (
          <div className={styles.modal_Container}>
            <CreateNewInvoiceModal />
          </div>
        ) : (
          <></>
        )}
        {editTaskModalOpen ? (
          <div className={styles.modal_Container}>
            <EditInvoiceModal />
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default OverviewPage;
