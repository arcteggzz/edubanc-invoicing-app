import styles from "./CreateInvoiceItem.module.scss";
import { useState, useEffect } from "react";
import { singleInvoiceDetailType } from "../../types/singleInvoiceDetail";

type CreateInvoiceItemProps = {
  item: singleInvoiceDetailType;
  invoiceItems: singleInvoiceDetailType[];
  setInvoiceItems: React.Dispatch<
    React.SetStateAction<singleInvoiceDetailType[]>
  >;
};

const CreateInvoiceItem = ({
  item,
  invoiceItems,
  setInvoiceItems,
}: CreateInvoiceItemProps) => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);
  const [quantityInput, setQuantityInput] = useState(0);

  const handleDelete = (id: number) => {
    const newArray = invoiceItems.filter(
      (invoiceItem) => invoiceItem.id !== id
    );
    setInvoiceItems(newArray);
  };

  useEffect(() => {
    const newArray: singleInvoiceDetailType[] = [];

    invoiceItems.map((invoiceItem) => {
      if (invoiceItem.id === item.id) {
        const newInvoiceItem = {
          ...invoiceItem,
          itemDescription: descriptionInput,
          itemPrice: priceInput,
          itemQuantity: quantityInput,
          itemTotal: priceInput * quantityInput,
        };
        newArray.push(newInvoiceItem);
      } else {
        newArray.push(invoiceItem);
      }
    });

    setInvoiceItems(newArray);
  }, [descriptionInput, priceInput, quantityInput]);

  return (
    <>
      <div className={styles.CreateInvoiceItem}>
        <div className={styles.description_container}>
          <label htmlFor="Description">Description</label>
          <input
            id="Description"
            required
            placeholder="Type the description"
            onChange={(e) => setDescriptionInput(e.target.value)}
            value={descriptionInput}
          />
        </div>

        <div className={styles.other_elements}>
          <div className={styles.title}>
            <label htmlFor="Unit Price">Unit Price</label>
            <input
              type="number"
              id="Unit Price"
              required
              placeholder="Unit Price"
              onChange={(e) => setPriceInput(+e.target.value)}
              value={priceInput}
            />
          </div>
          <div className={styles.title}>
            <label htmlFor="Quantity">Quantity</label>
            <input
              type="number"
              id="Quantity"
              required
              placeholder="Quantity"
              onChange={(e) => setQuantityInput(+e.target.value)}
              value={quantityInput}
            />
          </div>

          <p className={styles.total_text_calc}>{`Total : ${
            priceInput * quantityInput
          }`}</p>

          <button
            className={styles.delete_item_button}
            type="button"
            onClick={() => handleDelete(item.id)}
          >
            Del
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateInvoiceItem;
