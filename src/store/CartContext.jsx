import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // ...update state add a maeil item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  // console.log("item id", item.id);
  if (action.type === "REMOVE_ITEM") {
    // ...REMOVE ITEM FROM THE STATE
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exatingCardItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (exatingCardItem.quantity === 1) {
      // const updatedItems = [...state.items];
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...exatingCardItem,
        quantity: exatingCardItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLREAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
    console.log("id", id);
  }
  function clearCart() {
    dispatchCartAction({ type: "CLREAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  console.log("cartContext", cartContext);
  // console.log("cartcontext", cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
