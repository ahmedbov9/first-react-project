import { createContext, useContext, useState } from "react";
export const Cart = createContext(true);
export default function CartChangerContext({ children }) {
  const [isChange, setIsChange] = useState(true);
  return (
    <Cart.Provider value={{ isChange, setIsChange }}>{children}</Cart.Provider>
  );
}
