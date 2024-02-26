import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../Formatting";
import Input from "./UI/Input";
import UseProgressContext from "../store/UserprogressContext";
import Button from "./UI/Button";
import useHttp from "../hooks/UseHttp";
import Error from "./Error";
const requestConfig = {
  method: "POSt",
  headers: {
    "content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UseProgressContext);
  const { data, isLoading, clearData, isSending, error, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheackout();
  }
  function handleFinish() {
    userProgressCtx.hideCheackout();
    cartCtx.clearCart();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  let action = (
    <>
      <Button onClick={handleClose} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    action = <span>Sending order data</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>your order was submitted Successfully</p>
        <p>
          we will get back to you with more deails via email within the next few
          minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Cheackout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Eaild to submit order" message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
// import { useContext } from "react";

// import Modal from "./UI/Modal.jsx";
// import CartContext from "../store/CartContext.jsx";
// // import { currencyFormatter } from "../util/formatting.js";
// import { currencyFormatter } from "../Formatting.js";

// import Input from "./UI/Input.jsx";
// import Button from "./UI/Button.jsx";
// import UseProgressContext from "../store/UserprogressContext";
// // import UseProgressContext from "../store/UseProgressContext.jsx";
// // import UseProgressContext from "../store/UserprogressContext.jsx";

// export default function Checkout() {
//   const cartCtx = useContext(CartContext);
//   const userProgressCtx = useContext(UseProgressContext);

//   const cartTotal = cartCtx.items.reduce(
//     (totalPrice, item) => totalPrice + item.quantity * item.price,
//     0
//   );

//   function handleClose() {
//     userProgressCtx.hideCheackout();
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     const fd = new FormData(event.target);
//     const customerData = Object.fromEntries(fd.entries());
//   }

//   return (
//     <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
//       <form onSubmit={handleSubmit}>
//         <h2>Checkout</h2>
//         <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
//         {/* <Input label="Full Name" type="text" id="name" /> */}

//         <Input label="Full Name" type="text" id="name" />
//         <Input label="E-Mail Address" type="email" id="email" />
//         <Input label="Street" type="text" id="street" />
//         <div className="control-row">
//           <Input label="Postal Code" type="text" id="postal-code" />
//           <Input label="City" type="text" id="city" />
//         </div>

//         <p className="modal-actions">
//           <Button type="button" textOnly onClick={handleClose}>
//             Close
//           </Button>
//           <Button>Submit Order</Button>
//         </p>
//         {/* <h1>hello world</h1> */}
//       </form>
//     </Modal>
//   );
// }
