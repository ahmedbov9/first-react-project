import {
  faCartPlus,
  faCartShopping,
  faPenToSquare,
  faPlus,
  faStore,
  faTags,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: "1995",
  },
  {
    name: "Add User",
    path: "/dashboard/user/add",
    icon: faUserPlus,
    role: "1995",
  },
  {
    name: "categories",
    path: "/dashboard/categories",
    icon: faTags,
    role: ["1999", "1995"],
  },
  {
    name: "Add Category",
    path: "/dashboard/category/add",
    icon: faPlus,
    role: ["1999", "1995"],
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: faStore,
    role: ["1999", "1995"],
  },
  {
    name: "Add Product",
    path: "/dashboard/product/add",
    icon: faCartPlus,
    role: ["1999", "1995"],
  },
];
