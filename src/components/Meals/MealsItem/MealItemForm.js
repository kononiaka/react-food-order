import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const amountInput = useRef();

    const [formIsValid, setFormIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmountInput = amountInput.current.value;
        const enteredAmountInputNum = +enteredAmountInput;

        if (enteredAmountInput.trim().length === 0 || enteredAmountInputNum < 0 || enteredAmountInputNum > 5) {
            setFormIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountInputNum);
    };


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInput}
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1"
                }} />
            <button>+ Add</button>
            {!formIsValid && <p>Please, enter valid amount (1-5)</p>}
        </form>
    );
};

export default MealItemForm;