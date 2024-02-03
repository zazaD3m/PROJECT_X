/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSiteInfo } from "../features/user/userSlice";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector(selectSiteInfo);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return children;
}
