import {
  BarChart3,
  Layers3,
  LayoutGrid,
  Megaphone,
  Palette,
  Pentagon,
  Percent,
  RulerIcon,
  ShoppingCart,
  User2,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: <BarChart3 size={26} />,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: <User2 size={26} />,
  },
  {
    title: "Catalog",
    icon: <Layers3 size={26} />,
    isChildren: true,
    children: [
      {
        title: "Add Product",
        href: "/catalog/products/addproduct",
        icon: <ShoppingCart size={24} />,
      },
      {
        title: "Product List",
        href: "/catalog/products",
        icon: <ShoppingCart size={24} />,
      },
      {
        title: "Add Brand",
        href: "/catalog/brands/addbrand",
        icon: <Pentagon size={24} />,
      },
      {
        title: "Brand List",
        href: "/catalog/brands",
        icon: <Pentagon size={24} />,
      },
      {
        title: "Add Category",
        href: "/catalog/categories/addcategory",
        icon: <LayoutGrid size={24} />,
      },
      {
        title: "Category List",
        href: "/catalog/categories",
        icon: <LayoutGrid size={24} />,
      },
      {
        title: "Add Color",
        href: "/catalog/colors/addcolor",
        icon: <Palette size={24} />,
      },
      {
        title: "Color List",
        href: "/catalog/colors",
        icon: <Palette size={24} />,
      },
      {
        title: "Sizes",
        href: "/catalog/sizes",
        icon: <RulerIcon size={24} />,
      },
    ],
  },
  {
    title: "Promotion",
    icon: <Megaphone size={26} />,
    isChildren: true,
    children: [
      {
        title: "Add Sale",
        href: "/promotion/sales/addsale",
        icon: <Percent size={24} />,
      },
      {
        title: "Sale List",
        href: "/promotion/sales",
        icon: <Percent size={24} />,
      },
    ],
  },
  // {
  //   title: "Orders",
  //   href: "/orders",
  //   icon: <ClipboardList size={26} />,
  // },
  // {
  //   title: "Enquiries",
  //   href: "/enquiries",
  //   icon: <ClipboardList size={26} />,
  // },
];
