import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import React from 'react';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const deleteItemHandler = id => {
        cartCtx.removeItem(id);
    };
    const addItemHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const checkoutHandler = () => {
        setIsCheckout(true);
    };

    const hasItems = cartCtx.items.length > 0;

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch('https://react-http-request-f29f6-default-rtdb.firebaseio.com/items.json', {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                items: cartCtx.items
            })
        });
        console.log(userData);
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearItem();
    };

    const cartItems = <ul className={classes["cart-items"]}>
        {cartCtx.items.map(item => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={deleteItemHandler.bind(null, item.id)}
                onAdd={addItemHandler.bind(null, item)}
            />
        ))}</ul>;

    const actionsBtns = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
    </div>;

    const modalContent = <React.Fragment>{cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && actionsBtns}
    </React.Fragment>;

    const modalDidSubmit = <React.Fragment>
        <p>Your order was successfully sent!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>;
    return (
        <Modal onClick={props.onClose}>
            {!didSubmit && !isSubmitting && modalContent}
            {isSubmitting && <p>Your order is sending...</p>}
            {didSubmit && !isSubmitting && modalDidSubmit}
        </Modal>
    );
};

export default Cart;