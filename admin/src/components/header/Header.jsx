import { Menu, Search } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import NavigationMenu from "./NavigationMenu";
import ThemeModeToggle from "../ThemeModeToggle";

const Header = () => {
  return (
    <header className="flex h-12 w-full gap-x-8 border-b bg-background px-2 py-1 pr-4">
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <nav>
            <SheetContent className="w-[300px] overflow-y-auto" side="left">
              <NavigationMenu />
            </SheetContent>
          </nav>
        </Sheet>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input className="max-w-xs" type="text" placeholder="Search ..." />
        <Button variant="outline" size="icon" type="submit">
          <Search />
        </Button>
      </div>
      <div className="ml-auto">
        <ThemeModeToggle />
      </div>
    </header>
  );
};
export default Header;
