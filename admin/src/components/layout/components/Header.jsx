import { Menu, Search } from "lucide-react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import NavigationMenu from "./NavigationMenu";
import ThemeModeToggle from "../../ThemeModeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center border-b bg-background px-4">
      <Sheet asChild>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] overflow-y-auto" side="left">
          <nav>
            <NavigationMenu />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="ml-4 flex w-full max-w-sm items-center space-x-2">
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
