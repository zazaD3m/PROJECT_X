import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectSiteInfo, setTheme } from "../features/user/userSlice";
import { useEffect } from "react";

const ThemeModeToggle = () => {
  const { theme } = useSelector(selectSiteInfo);
  const dispatch = useDispatch();

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

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        theme === "light"
          ? dispatch(setTheme("dark"))
          : dispatch(setTheme("light"));
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
export default ThemeModeToggle;
