import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UseProgressContext from "../store/UserprogressContext";
function Header() {
  const cartCtx = useContext(CartContext);
  // console.log("cart", cartCtx);
  const userProgressCtx = useContext(UseProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  function handlelShowCart() {
    console.log("userProgressCtx", userProgressCtx);
    userProgressCtx.showCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="a restuant" />
        </div>
        <h1>My Quick Yummy</h1>
        <nav>
          <Button textOnly onClick={handlelShowCart}>
            Cart({totalCartItems})
          </Button>
        </nav>
      </header>
    </>
  );
}
export default Header;
