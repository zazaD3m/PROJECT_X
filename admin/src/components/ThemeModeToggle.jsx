import { useContext } from "react";
import { ThemeProviderContext, useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeModeToggle = () => {
  const context = useContext(ThemeProviderContext);
  const { setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        context.theme === "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
export default ThemeModeToggle;