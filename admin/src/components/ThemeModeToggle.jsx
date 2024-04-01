import { useDispatch, useSelector } from "react-redux";
import { selectSiteInfo, setTheme } from "../features/user/userSlice";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";

const ThemeModeToggle = () => {
  const { theme } = useSelector(selectSiteInfo);
  const dispatch = useDispatch();

  return (
    <>
      <DropdownMenuRadioGroup
        value={theme}
        onValueChange={(e) => {
          dispatch(setTheme(e));
        }}
      >
        <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </>
  );
};
export default ThemeModeToggle;
