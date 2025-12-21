import styles from "./Description.module.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FaCoffee } from "react-icons/fa";

export default function Description({
  title = "Sip Happens Café",
  text = "Please leave your feedback about our service by selecting one of the options below.",
  className,
}) {
  return (
    <section className={clsx(styles.section, className)}>
      <h1 className={styles.title}>
        <FaCoffee className={styles.icon} aria-hidden="true" />
        {title}
      </h1>
      <p className={styles.text}>{text}</p>
    </section>
  );
}

Description.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};
