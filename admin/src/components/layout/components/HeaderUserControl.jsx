import { LogOut, Palette, User } from "lucide-react";
import ThemeModeToggle from "../../ThemeModeToggle";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useLogoutMutation } from "../../../features/auth/authApiSlice";

const HeaderUserControl = () => {
  const [logoutTrigger] = useLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 size-6" />
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
            <ThemeModeToggle />
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            logoutTrigger();
          }}
        >
          <LogOut className="mr-2 size-6" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default HeaderUserControl;

// <Button variant="outline" size="icon" onClick={() => {}}>
//       <User />
//     </Button>
//     <ThemeModeToggle />
