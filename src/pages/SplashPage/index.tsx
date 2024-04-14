import styles from "./SplashPage.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  images,
  routePaths,
  hasDeletedAllInvoicesBeforeKey,
  localStorageKey,
  presetInvoices,
} from "../../utils";
import { useDispatch } from "react-redux";
import { addAllTemplateInvoices } from "../../redux/features/Invoices/InvoicesSlice";

const SplashPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const interactedWithTemplates = localStorage.getItem(
    hasDeletedAllInvoicesBeforeKey
  );

  if (interactedWithTemplates !== "true") {
    localStorage.setItem(hasDeletedAllInvoicesBeforeKey, "false");
    localStorage.setItem(localStorageKey, JSON.stringify(presetInvoices));
    dispatch(addAllTemplateInvoices());
  }

  useEffect(() => {
    setTimeout(() => {
      navigate(routePaths.INTRODUCTION);
    }, 1800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.SplashPage}>
        <img src={images.edubancLogo} alt="" className={styles.edubancLogo} />
      </div>
    </>
  );
};

export default SplashPage;
