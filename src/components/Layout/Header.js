import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import reactMeals from "../assets/meals.jpg";

import classes from "./Header.module.css";


const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShow} />
        </header>
        <div className={classes['main-image']}>
            <img src={reactMeals} alt="A full table of food!"></img>
        </div>
    </Fragment>;
};

export default Header;