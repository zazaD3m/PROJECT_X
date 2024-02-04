import { NavLink } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { SheetClose } from "../../ui/sheet";
import { NAV_ITEMS } from "../../constants/sideNav";
import { ChevronDown } from "lucide-react";

const NavigationMenu = () => {
  return (
    <ul className="flex flex-col gap-y-4 py-8">
      {NAV_ITEMS.map((item) => (
        <li key={item.title}>
          {item.children ? (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <Button
                  size="sm"
                  asChild
                  variant="ghost"
                  className="data h-12 w-full justify-start gap-x-2 last:[&[data-state=open]>svg]:rotate-180"
                >
                  <AccordionTrigger>
                    {item.icon}
                    {item.title}
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                  </AccordionTrigger>
                </Button>
                <AccordionContent>
                  <ul className="ml-8 mt-4 flex flex-col gap-y-2 rounded-md bg-accent p-4">
                    {item.children.map((childItem) => (
                      <li key={childItem.title}>
                        <SheetClose asChild>
                          <Button
                            asChild
                            size="xs"
                            variant="ghost"
                            className="h-10 w-full justify-start gap-x-2 hover:bg-background aria-[current=page]:bg-background"
                          >
                            <NavLink end to={childItem.href}>
                              {childItem.icon}
                              {childItem.title}
                            </NavLink>
                          </Button>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <SheetClose asChild>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="h-12 w-full justify-start gap-x-2 aria-[current=page]:bg-accent"
              >
                <NavLink to={item.href}>
                  {item.icon}
                  {item.title}
                </NavLink>
              </Button>
            </SheetClose>
          )}
        </li>
      ))}
    </ul>
  );
};
export default NavigationMenu;
