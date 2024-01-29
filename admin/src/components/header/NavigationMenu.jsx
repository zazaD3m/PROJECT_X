import { NavLink } from "react-router-dom";
import {
  ClipboardList,
  Gauge,
  LayoutGrid,
  Palette,
  Pentagon,
  ShoppingCart,
  User2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { SheetClose } from "../ui/sheet";

const navbarContent = [
  {
    title: "Dashboard",
    href: "/dashboard",
    id: 1,
    icon: <Gauge size={26} />,
  },
  {
    title: "Customers",
    href: "/customers",
    id: 2,
    icon: <User2 size={26} />,
  },
  {
    dropdown: true,
    title: "Catalog",
    id: 3,
    icon: <ShoppingCart size={26} />,
    items: [
      {
        title: "Add Product",
        href: "/catalog/products/addproduct",
        icon: <ShoppingCart size={24} />,
        id: 101,
      },
      {
        title: "Product List",
        href: "/catalog/products",
        icon: <ShoppingCart size={24} />,
        id: 102,
      },
      {
        title: "Add Brand",
        href: "/catalog/brands/addbrand",
        icon: <Pentagon size={24} />,
        id: 103,
      },
      {
        title: "Brand List",
        href: "/catalog/brands",
        icon: <Pentagon size={24} />,
        id: 104,
      },
      {
        title: "Add Category",
        href: "/catalog/categories/addcategory",
        icon: <LayoutGrid size={24} />,
        id: 105,
      },
      {
        title: "Category List",
        href: "/catalog/categories",
        icon: <LayoutGrid size={24} />,
        id: 106,
      },
      {
        title: "Add Color",
        href: "/catalog/colors/addcolor",
        icon: <Palette size={24} />,
        id: 107,
      },
      {
        title: "Color List",
        href: "/catalog/colors",
        icon: <Palette size={24} />,
        id: 108,
      },
    ],
  },
  {
    title: "Orders",
    href: "/orders",
    id: 4,
    icon: <ClipboardList size={26} />,
  },
  {
    title: "Enquiries",
    href: "/enquiries",
    id: 5,
    icon: <ClipboardList size={26} />,
  },
];

const NavigationMenu = () => {
  return (
    <ul className="flex flex-col gap-y-4 py-8">
      {navbarContent.map((item) => (
        <li key={item.id}>
          {item.dropdown ? (
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${item.id}`}>
                <Button
                  size="sm"
                  asChild
                  variant="ghost"
                  className="data w-full justify-start gap-x-2 last:[&[data-state=open]>svg]:rotate-180"
                >
                  <AccordionTrigger>
                    {item.icon}
                    {item.title}
                  </AccordionTrigger>
                </Button>
                <AccordionContent>
                  <ul className="ml-8 mt-4 flex flex-col gap-y-2 rounded-md bg-accent p-4">
                    {item.items.map((subItem) => (
                      <li key={subItem.id}>
                        <SheetClose asChild>
                          <Button
                            asChild
                            size="xs"
                            variant="ghost"
                            className="w-full justify-start gap-x-2 hover:bg-background aria-[current=page]:bg-background"
                          >
                            <NavLink end to={subItem.href}>
                              {subItem.icon}
                              {subItem.title}
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
                className="w-full justify-start gap-x-2 aria-[current=page]:bg-accent"
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
