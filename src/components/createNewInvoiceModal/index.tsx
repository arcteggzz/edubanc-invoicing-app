import styles from "./CreateNewInvoiceModal.module.scss";
import { FormEvent, useState } from "react";
// import { RootState } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { closeCreateTaskModal } from "../../redux/features/Modals/ModalsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { images } from "../../utils";
import { CreateInvoiceItem } from "../index";
import { singleInvoiceDetailType } from "../../types/singleInvoiceDetail";
import { addNewInvoice } from "../../redux/features/Invoices/InvoicesSlice";

const CreateNewInvoiceModal = () => {
  const dispatch = useDispatch();

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const [invoiceItems, setInvoiceItems] = useState<singleInvoiceDetailType[]>([
    {
      id: 0,
      itemDescription: "",
      itemPrice: 0,
      itemQuantity: 0,
      itemTotal: 0,
    },
  ]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newInvoice = {
      clientDetails: {
        clientName,
        clientEmail,
        clientPhone,
      },
      paymentDetails: { bankName, accountName, accountNumber },
      invoiceItems,
      grandTotal: invoiceItems.reduce((total, currentItem) => {
        return total + currentItem.itemTotal;
      }, 0),
    };

    // console.log(newInvoice);
    dispatch(addNewInvoice(newInvoice));
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setBankName("");
    setAccountNumber("");
    setAccountName("");

    toast.success(`Invoice created successfully.`, { autoClose: false });

    setTimeout(() => {
      dispatch(closeCreateTaskModal());
    }, 2000);
  };

  // useEffect(() => {
  //   const handleClick = (e: Event) => {
  //     if (isFirstRender.current) {
  //       isFirstRender.current = false;
  //       return;
  //     } else {
  //       if (createTaskModal) {
  //         if (!modalRef?.current?.contains(e.target as HTMLDivElement)) {
  //           dispatch(closeCreateTaskModal());
  //         }
  //       }
  //     }
  //   };

  //   document.addEventListener("click", handleClick);

  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // });

  return (
    <>
      <form
        className={styles.CreateNewInvoiceModal}
        onSubmit={(event: FormEvent) => handleSubmit(event)}
      >
        <div className={styles.header}>
          <h1>Create A New Invoice</h1>
          <p>
            Please take your time to fill in the required fields properly. Some
            fields are required...
          </p>
        </div>

        <div className={styles.form_body}>
          <div className={styles.left_side}>
            {/* client details */}
            <div className={styles.client_details}>
              <p>Client Details</p>
              <div className={styles.title}>
                <label htmlFor="Client Name">Client Name</label>
                <input
                  type="text"
                  id="Client Name"
                  required
                  placeholder="Enter Client Name"
                  onChange={(e) => setClientName(e.target.value)}
                  value={clientName}
                />
              </div>
              <div className={styles.title}>
                <label htmlFor="Phone Number">Client Phone number</label>
                <input
                  type="text"
                  id="Phone Number"
                  required
                  placeholder="Enter Phone Number"
                  onChange={(e) => setClientPhone(e.target.value)}
                  value={clientPhone}
                />
              </div>
              <div className={styles.title}>
                <label htmlFor="Email">Client Phone Email</label>
                <input
                  type="email"
                  id="Email"
                  required
                  placeholder="Enter Email"
                  onChange={(e) => setClientEmail(e.target.value)}
                  value={clientEmail}
                />
              </div>
            </div>

            {/* payment details */}
            <div className={styles.client_details}>
              <p>Payment Details</p>
              <div className={styles.title}>
                <label htmlFor="Bank Name">Bank Name</label>
                <input
                  type="text"
                  id="Bank Name"
                  required
                  placeholder="Enter Bank Name"
                  onChange={(e) => setBankName(e.target.value)}
                  value={bankName}
                />
              </div>
              <div className={styles.title}>
                <label htmlFor="Account Number">Account Number</label>
                <input
                  type="text"
                  id="Account Number"
                  required
                  placeholder="Enter Account Number"
                  onChange={(e) => setAccountNumber(e.target.value)}
                  value={accountNumber}
                />
              </div>
              <div className={styles.title}>
                <label htmlFor="Account Name">Account Name</label>
                <input
                  type="text"
                  id="Account Name"
                  required
                  placeholder="Account Name"
                  onChange={(e) => setAccountName(e.target.value)}
                  value={accountName}
                />
              </div>
            </div>
          </div>

          <div className={styles.right_side}>
            <h3>Invoice Items</h3>
            <p className={styles.support_text}>
              Add, delete and finetune your invoice Items to match your needs.
            </p>

            <div className={styles.invoice_elements}>
              {invoiceItems.map((item) => {
                return (
                  <CreateInvoiceItem
                    item={item}
                    invoiceItems={invoiceItems}
                    setInvoiceItems={setInvoiceItems}
                    key={`CreateInvoiceItem${item.id}`}
                  />
                );
              })}
            </div>

            <button
              className={styles.add_line_button}
              type="button"
              onClick={() => {
                setInvoiceItems([
                  ...invoiceItems,
                  {
                    id: invoiceItems.length,
                    itemDescription: "",
                    itemPrice: 0,
                    itemQuantity: 0,
                    itemTotal: 0,
                  },
                ]);
              }}
            >
              Add Line Item
            </button>
          </div>
        </div>

        <div className={styles.button_divs}>
          <button className={styles.create_button} type="submit">
            Create
          </button>
          <button
            className={styles.close_button}
            type="button"
            onClick={() => {
              dispatch(closeCreateTaskModal());
            }}
          >
            Close
          </button>
        </div>
        <ToastContainer />

        <div className={styles.mobile_message}>
          <img src={images.broken} alt="" />
          <h2>
            Sorry... At this moment, you can only create invoices from a desktop
            device
          </h2>

          <button
            className={styles.close_button}
            onClick={() => {
              dispatch(closeCreateTaskModal());
            }}
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNewInvoiceModal;
