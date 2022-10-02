import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
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
    return (
        <Modal onClick={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose} />}
            {!isCheckout && actionsBtns}

        </Modal>
    );
};

export default Cart;