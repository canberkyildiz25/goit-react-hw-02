import styles from "./Options.module.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FaMeh, FaRegFrown, FaRegSmile } from "react-icons/fa";

const getOptionMeta = (option) => {
  switch (option) {
    case "good":
      return { label: "Good", Icon: FaRegSmile };
    case "neutral":
      return { label: "Neutral", Icon: FaMeh };
    case "bad":
      return { label: "Bad", Icon: FaRegFrown };
    default:
      return { label: option, Icon: null };
  }
};

export default function Options({
  options = [],
  onLeaveFeedback = () => {},
  className,
}) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {options.map((option) => {
        const { label, Icon } = getOptionMeta(option);

        return (
          <button
            key={option}
            type="button"
            onClick={() => onLeaveFeedback(option)}
            className={styles.button}
          >
            {Icon ? <Icon className={styles.icon} aria-hidden="true" /> : null}
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onLeaveFeedback: PropTypes.func,
  className: PropTypes.string,
};
