import styles from "./OverviewPage.module.scss";
import {
  CreateInvoice,
  CreateNewInvoiceModal,
  InvoiceCollection,
  InvoiceControlPanel,
  ViewInvoiceModal,
  DeleteAllInvoiceModal,
  EditStatusModal,
} from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

const OverviewPage = () => {
  const createTaskModalOpen = useSelector(
    (state: RootState) => state.modalsSliceReducer.createTaskModal
  );
  const viewTaskModalOpen = useSelector(
    (state: RootState) => state.modalsSliceReducer.viewTaskModal
  );
  const deleteAllTaskModalOpen = useSelector(
    (state: RootState) => state.modalsSliceReducer.deleteAllTaskModal
  );
  const editInvoiceStatusModalOpen = useSelector(
    (state: RootState) => state.modalsSliceReducer.editInvoiceStatusModal
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

        {viewTaskModalOpen ? (
          <div className={styles.modal_Container}>
            <ViewInvoiceModal />
          </div>
        ) : (
          <></>
        )}

        {deleteAllTaskModalOpen ? (
          <div className={styles.modal_Container}>
            <DeleteAllInvoiceModal />
          </div>
        ) : (
          <></>
        )}

        {editInvoiceStatusModalOpen ? (
          <div className={styles.modal_Container}>
            <EditStatusModal />
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default OverviewPage;
