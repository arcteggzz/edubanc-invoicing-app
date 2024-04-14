import styles from "./ViewInvoiceModal.module.scss";
import { useRef } from "react";
import { RootState } from "../../redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  closeViewTaskModal,
  clearViewInvoiceId,
} from "../../redux/features/Modals/ModalsSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { images } from "../../utils";
import { RowTextWithKey, StatusText } from "../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewInvoiceModal = () => {
  const dispatch = useDispatch();

  const viewInvoiceId = useSelector((state: RootState) => {
    return state.modalsSliceReducer.viewInvoiceId;
  });

  const allInvoices = useSelector((state: RootState) => {
    return state.invoiceSliceReducer;
  });

  const currentInvoice = allInvoices.find(
    (invoice) => invoice.id === (viewInvoiceId as number)
  );

  let modalRef = useRef<HTMLDivElement>(null);

  const printPDF = () => {
    const input = modalRef.current;
    html2canvas(input as HTMLDivElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${currentInvoice?.clientDetails.clientName}_invoice.pdf`);
    });

    toast.success(`Invoice Status updated successfully.`, {
      autoClose: false,
    });
  };

  return (
    <>
      <div className={styles.ViewInvoiceModal}>
        <div className={styles.pdf_ref} ref={modalRef}>
          <div className={styles.pdf_container}>
            <div className={styles.left_side}>
              <img
                src={images.edubancLogo}
                alt=""
                className={styles.edubanc_logo_img}
              />
              <RowTextWithKey
                identifier="Invoice Id :"
                value={currentInvoice ? `${currentInvoice.id}` : ""}
              />
              <RowTextWithKey
                identifier="Invoice date :"
                value={currentInvoice ? `${currentInvoice.dateCreated}` : ""}
              />

              <div className={styles.invoice_status_container}>
                <h5>Invoice Status : </h5>
                <StatusText
                  text={currentInvoice ? currentInvoice.status : "completed"}
                />
              </div>

              <RowTextWithKey
                identifier="Issued to :"
                value=""
                marginBottom="2px"
              />
              <h4 className={styles.name}>
                {currentInvoice
                  ? `${currentInvoice.clientDetails.clientName}`
                  : ``}
              </h4>
              <RowTextWithKey
                identifier="Email :"
                value={
                  currentInvoice
                    ? `${currentInvoice.clientDetails.clientEmail}`
                    : ""
                }
              />
              <RowTextWithKey
                identifier="Phone No. :"
                value={
                  currentInvoice
                    ? `${currentInvoice.clientDetails.clientPhone}`
                    : ""
                }
                marginBottom="24px"
              />
              <RowTextWithKey
                identifier="Payment Method"
                value=""
                marginBottom="2px"
                fontWeight="700"
              />
              <RowTextWithKey
                identifier="Account No. :"
                value={
                  currentInvoice
                    ? `${currentInvoice.paymentDetails.accountNumber}`
                    : ""
                }
              />
              <RowTextWithKey
                identifier="Account Name :"
                value={
                  currentInvoice
                    ? `${currentInvoice.paymentDetails.accountName}`
                    : ""
                }
              />
              <RowTextWithKey
                identifier="Bank Name :"
                value={
                  currentInvoice
                    ? `${currentInvoice.paymentDetails.bankName}`
                    : ""
                }
                marginBottom="24px"
              />
              <RowTextWithKey
                identifier="Notes"
                value=""
                marginBottom="2px"
                fontWeight="700"
              />
              <RowTextWithKey
                identifier=""
                value="This invoice has a due date and will be marked as 'late' when it expires."
                valueFontWeight="500"
              />
            </div>

            <div className={styles.right_side}>
              <div className={styles.head_container}>
                <h2 className={styles.invoice_letter}>I</h2>
                <h2 className={styles.invoice_letter}>N</h2>
                <h2 className={styles.invoice_letter}>V</h2>
                <h2 className={styles.invoice_letter}>O</h2>
                <h2 className={styles.invoice_letter}>I</h2>
                <h2 className={styles.invoice_letter}>C</h2>
                <h2 className={styles.invoice_letter}>E</h2>
              </div>

              <div className={styles.table_header}>
                <p>Item Description</p>
                <div className={styles.other_header_elements}>
                  <p>Price</p>
                  <p>QTY</p>
                  <p>Total</p>
                </div>
              </div>

              <div className={styles.table_elements_container}>
                {currentInvoice &&
                  currentInvoice.invoiceItems.map((invoiceItem, id) => {
                    return (
                      <div
                        className={styles.table_element}
                        style={
                          id % 2 !== 0
                            ? { background: "#f1f1f1" }
                            : { background: "" }
                        }
                        key={`table_element${invoiceItem.id}`}
                      >
                        <p>{invoiceItem.itemDescription}</p>
                        <div className={styles.other_elements}>
                          <p>{invoiceItem.itemPrice}</p>
                          <p>{invoiceItem.itemQuantity}</p>
                          <p>{invoiceItem.itemTotal}</p>
                        </div>
                      </div>
                    );
                  })}
                {}
              </div>

              <div className={styles.total_container}>
                <p>Grand Total</p>
                <h3>{"$" + currentInvoice?.grandTotal.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.button_divs}>
          <button onClick={printPDF} className={styles.print_button}>
            Print Invoice
          </button>
          <button
            onClick={() => {
              dispatch(closeViewTaskModal());
              dispatch(clearViewInvoiceId());
            }}
            className={styles.close_button}
          >
            Close Invoice
          </button>
        </div>
        <ToastContainer />

        <div className={styles.mobile_message}>
          <img src={images.broken} alt="" />
          <h2>
            Sorry... At this moment, you can only view and download invoices
            from a desktop device
          </h2>

          <button
            className={styles.close_button}
            onClick={() => {
              dispatch(closeViewTaskModal());
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewInvoiceModal;
