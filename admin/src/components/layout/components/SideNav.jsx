import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/sideNav";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { Accordion, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { AccordionContent } from "@radix-ui/react-accordion";
import { toggleSidebar } from "../../../features/user/userSlice";

const SideNav = ({ catalogOpen, setCatalogOpen, isOpen }) => {
  const dispatch = useDispatch();
  return (
    <nav className="px-2">
      <ul className="flex flex-col gap-y-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.title}>
            {!item.isChildren ? (
              <Button
                asChild
                variant="ghost"
                className="flex h-12 items-center justify-start p-0"
              >
                <NavLink to={item.href} end>
                  <div className="flex h-full w-12 items-center justify-center">
                    {item.icon}
                  </div>
                  {isOpen && <span className="text-base">{item.title}</span>}
                </NavLink>
              </Button>
            ) : (
              <Accordion
                type="single"
                collapsible
                asChild
                value={catalogOpen}
                onValueChange={setCatalogOpen}
              >
                <AccordionItem asChild value="catalog">
                  <>
                    <AccordionTrigger asChild>
                      <Button
                        variant="ghost"
                        className="group flex h-12 w-full items-center justify-start p-0  last:[&[data-state=open]>svg]:rotate-180"
                        onClick={(e) => {
                          if (!isOpen) {
                            dispatch(toggleSidebar());
                          }
                        }}
                      >
                        <div className="flex h-full w-12 items-center justify-center">
                          {item.icon}
                        </div>
                        {isOpen && (
                          <>
                            <span className="text-base">{item.title}</span>
                            <ChevronDown
                              className={cn(
                                "ml-auto mr-2 h-4 w-4 shrink-0 transition-transform duration-200",
                              )}
                            />
                          </>
                        )}
                      </Button>
                    </AccordionTrigger>
                    <AccordionContent asChild>
                      <ul className="ml-4 flex flex-col gap-y-2">
                        {item.children.map((childItem) => (
                          <li key={childItem.title}>
                            <Button
                              asChild
                              variant="ghost"
                              className="flex h-12 items-center justify-start p-0"
                            >
                              <NavLink to={childItem.href} end>
                                <div className="flex h-full w-12 items-center justify-center">
                                  {childItem.icon}
                                </div>
                                {isOpen && (
                                  <span className="text-base">
                                    {childItem.title}
                                  </span>
                                )}
                              </NavLink>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </>
                </AccordionItem>
              </Accordion>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default SideNav;

{
  /* <Accordion type="single" collapsible className="h-full">
  <AccordionItem
    value={item.title}
    className="h-full border-none"
  >
    <Button
      asChild
      variant="ghost"
      className={cn(
        "flex h-full w-full items-center justify-start p-0",
      )}
      onClick={() => {
        if (!isOpen) {
          dispatch(toggleSidebar());
        }
      }}
    >
      <AccordionTrigger>
        <div
          className={cn(
            "flex h-full w-12 items-center justify-center",
            !isOpen && "peer",
          )}
        >
          {item.icon}
        </div>
        <span
          className={cn(
            "absolute left-12 text-base",
            !isOpen && className,
          )}
        >
          {item.title}
        </span>
        {isOpen && (
          <ChevronDown
            className={cn(
              "absolute right-2 -z-10 h-4 w-4 shrink-0 transition-transform duration-200",
            )}
          />
        )}
      </AccordionTrigger>
    </Button>
    <AccordionContent className="ml-4 mt-2 space-y-2 pb-1">
      <ul>
        {item.children.map((childItem) => (
          <li key={childItem.title}>
            <Button asChild variant="ghost" className="">
              <NavLink to={childItem.href}>{}</NavLink>
            </Button>
          </li>
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
</Accordion> */
}
