import styles from "./IntroductionPage.module.scss";
import { Link } from "react-router-dom";
import { images, routePaths } from "../../utils";

const IntroductionPage = () => {
  return (
    <>
      <div className={styles.IntroductionPage}>
        <section>
          <h1>
            Esedere Oghenetega’s{" "}
            <span>Submission for Edubanc Frontend Assessment</span>
          </h1>
          <div className={styles.description}>
            <p>Task Description:</p>
            <p>
              Created an Invoicing Management System to allow a user manage
              creation, editing, and deleting of Invoices and many other
              features.
            </p>

            <p>Kindly note that the experience is enhanced on Desktop.</p>
            <p style={{ color: "#2d70fd", fontWeight: 500 }}>
              In order to enhance your experience within the application, three
              invoices have been created for you (as presets). You can use these
              to experiment on the application. Enjoy. Kindly note that deleting
              any of the preset invoice is permanent.
            </p>
          </div>
          <Link to={routePaths.HOME} className={styles.linkLogin}>
            CLICK TO VIEW SUBMISSION
            <div className={styles.pinger}></div>
          </Link>
        </section>
        <img src={images.assessmentImage} alt="assessment_image" />
      </div>
    </>
  );
};

export default IntroductionPage;
