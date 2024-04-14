import styles from "./SplashPage.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images, routePaths } from "../../utils";

const SplashPage = () => {
  const navigate = useNavigate();

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
