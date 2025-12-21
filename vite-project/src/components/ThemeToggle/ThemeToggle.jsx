import PropTypes from "prop-types";
import clsx from "clsx";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({ theme, onToggle, className }) {
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className={clsx(styles.button, className)}
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <FaSun className={styles.icon} aria-hidden="true" />
      ) : (
        <FaMoon className={styles.icon} aria-hidden="true" />
      )}
      <span className={styles.text}>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
};
