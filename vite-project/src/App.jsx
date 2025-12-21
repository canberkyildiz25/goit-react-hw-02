import { useEffect, useMemo, useState } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import "./App.css";

const FEEDBACK_STORAGE_KEY = "goit-feedback-values";

const getInitialFeedbackValues = () => {
  const empty = { good: 0, neutral: 0, bad: 0 };

  if (typeof window === "undefined") return empty;

  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) return empty;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return empty;

    return {
      good: Number.isFinite(parsed.good) ? parsed.good : 0,
      neutral: Number.isFinite(parsed.neutral) ? parsed.neutral : 0,
      bad: Number.isFinite(parsed.bad) ? parsed.bad : 0,
    };
  } catch {
    return empty;
  }
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
};

function App() {
  const options = ["good", "neutral", "bad"];

  const [theme, setTheme] = useState(getInitialTheme);

  const [values, setValues] = useState(getInitialFeedbackValues);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(values));
    } catch {
      // ignore write errors (private mode / quota)
    }
  }, [values]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLeaveFeedback = (option) => {
    setValues((prev) => ({
      ...prev,
      [option]: (prev[option] ?? 0) + 1,
    }));
  };

  const total = useMemo(
    () => Object.values(values).reduce((sum, value) => sum + value, 0),
    [values]
  );

  const positivePercentage = useMemo(() => {
    if (total === 0) return 0;
    return Math.round((values.good / total) * 100);
  }, [total, values.good]);

  return (
    <>
      <div className="toolbar">
        <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
      </div>

      <Description
        title="Sip Happens Café"
        text="Please leave your feedback about our service by selecting one of the options below."
      />

      <Options options={options} onLeaveFeedback={handleLeaveFeedback} />

      <Feedback
        values={values}
        total={total}
        positivePercentage={positivePercentage}
      />
    </>
  );
}

export default App;
