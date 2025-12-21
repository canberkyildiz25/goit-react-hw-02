import styles from "./Feedback.module.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FaChartBar, FaMeh, FaRegFrown, FaRegSmile } from "react-icons/fa";

const OPTION_META = {
  good: { label: "Good", Icon: FaRegSmile },
  neutral: { label: "Neutral", Icon: FaMeh },
  bad: { label: "Bad", Icon: FaRegFrown },
};

export default function Feedback({
  values = {},
  total = 0,
  positivePercentage = 0,
  className,
}) {
  const orderedKeys = ["good", "neutral", "bad"].filter((key) => key in values);

  return (
    <section className={clsx(styles.section, className)}>
      <h2 className={styles.title}>
        <FaChartBar className={styles.titleIcon} aria-hidden="true" />
        Feedback
      </h2>

      <ul className={styles.list}>
        {orderedKeys.map((key) => {
          const { label, Icon } = OPTION_META[key] ?? {
            label: key,
            Icon: null,
          };
          const value = values[key] ?? 0;

          return (
            <li key={key} className={styles.item}>
              <span className={styles.key}>
                {Icon ? (
                  <Icon className={styles.icon} aria-hidden="true" />
                ) : null}
                {label}
              </span>
              <span className={styles.value}>{value}</span>
            </li>
          );
        })}
      </ul>

      <div className={styles.summaryRow}>
        <p className={styles.summary}>Total: {total}</p>
        <p className={styles.summary}>Positive: {positivePercentage}%</p>
      </div>
    </section>
  );
}

Feedback.propTypes = {
  values: PropTypes.shape({
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
  }),
  total: PropTypes.number,
  positivePercentage: PropTypes.number,
  className: PropTypes.string,
};
