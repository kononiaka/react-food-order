import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() !== "";
const isFiveCharts = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = isEmpty(enteredName);
        const streetIsValid = isEmpty(enteredStreet);
        const cityIsValid = isEmpty(enteredCity);
        const postalIsValid = isFiveCharts(enteredPostal);

        console.log(postalIsValid);

        setFormInputValidity({
            name: nameIsValid,
            street: streetIsValid,
            postalCode: postalIsValid,
            city: cityIsValid
        });

        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;


        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        });
    };

    const nameClassesControl = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`;
    const streetClassesControl = `${classes.control} ${formInputValidity.street ? "" : classes.invalid}`;
    const postalClassesControl = `${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid}`;
    const cityClassesControl = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`;

    console.log(postalClassesControl);
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClassesControl}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>Please, enter correct name</p>}
            </div>
            <div className={streetClassesControl}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p>Please, enter correct street</p>}
            </div>
            <div className={postalClassesControl}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputValidity.postalCode && <p>Please, enter correct postal code</p>}
            </div>
            <div className={cityClassesControl}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p>Please, enter correct city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;