import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/meals";
// import { CartContextProvider } from "./store/CartContext";
import { CartContextProvider } from "./store/CartContext";
import { UseProgressContextProvider } from "./store/UserprogressContext";

function App() {
  return (
    <>
      <UseProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UseProgressContextProvider>
    </>
  );
}

export default App;
