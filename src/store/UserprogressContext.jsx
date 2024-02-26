import { createContext, useState } from "react";
const UseProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheackout: () => {},
  hideCheackout: () => {},
});
export function UseProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");
  function showCart() {
    setUserProgress("cart");
  }
  function showCheackout() {
    setUserProgress("checkout");
  }
  function hideCart() {
    setUserProgress("");
  }
  function hideCheackout() {
    setUserProgress("");
  }
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheackout,
    hideCheackout,
  };

  return (
    <UseProgressContext.Provider value={userProgressCtx}>
      {children}
    </UseProgressContext.Provider>
  );
}
export default UseProgressContext;
