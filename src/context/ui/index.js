import { createContext, useContext, useState } from "react";

export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  return (
    <UIContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        showSearchBox,
        setShowSearchBox,
        showCart,
        setShowCart,
        cart,
        setCart,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
