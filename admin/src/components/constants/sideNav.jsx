import {
  ClipboardList,
  Gauge,
  Layers3,
  LayoutGrid,
  Palette,
  Pentagon,
  Ruler,
  ShoppingCart,
  User2,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Gauge size={26} />,
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
        title: "Add Size",
        href: "/catalog/sizes/addsize",
        icon: <Ruler size={24} />,
      },
      {
        title: "Size List",
        href: "/catalog/sizes",
        icon: <Ruler size={24} />,
      },
    ],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <ClipboardList size={26} />,
  },
  {
    title: "Enquiries",
    href: "/enquiries",
    icon: <ClipboardList size={26} />,
  },
];
