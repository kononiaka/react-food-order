import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedState = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;

        return {
            items: updatedState,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultState;
};

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };
    const removeItemToCartHandler = id => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    );
};

export default CartProvider;