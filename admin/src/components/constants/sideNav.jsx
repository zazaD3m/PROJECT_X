import {
  ClipboardList,
  Layers3,
  LayoutDashboard,
  LayoutGrid,
  Palette,
  Pentagon,
  ShoppingCart,
  Users,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="text-sky-500" />,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: <Users className=" text-sky-500" />,
  },
  {
    title: "Catalog",
    icon: <Layers3 className=" text-orange-500" />,
    isChildren: true,
    children: [
      {
        title: "Add Product",
        href: "/catalog/products/addproduct",
        icon: <ShoppingCart className=" text-sky-500" />,
      },
      {
        title: "Product List",
        href: "/catalog/products",
        icon: <ShoppingCart className=" text-sky-500" />,
      },
      {
        title: "Add Brand",
        href: "/catalog/brands/addbrand",
        icon: <Pentagon className=" text-sky-500" />,
      },
      {
        title: "Brand List",
        href: "/catalog/brands",
        icon: <Pentagon className=" text-sky-500" />,
      },
      {
        title: "Add Category",
        href: "/catalog/categories/addcategory",
        icon: <LayoutGrid className=" text-sky-500" />,
      },
      {
        title: "Category List",
        href: "/catalog/categories",
        icon: <LayoutGrid className=" text-sky-500" />,
      },
      {
        title: "Add Color",
        href: "/catalog/colors/addcolor",
        icon: <Palette className=" text-sky-500" />,
      },
      {
        title: "Color List",
        href: "/catalog/colors",
        icon: <Palette className=" text-sky-500" />,
      },
    ],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <ClipboardList className=" text-sky-500" />,
  },
  {
    title: "Enquiries",
    href: "/enquiries",
    icon: <ClipboardList className=" text-sky-500" />,
  },
];
