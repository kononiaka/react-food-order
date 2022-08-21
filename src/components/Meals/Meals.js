import { Fragment } from 'react';

import ActiveMeals from './ActiveMeals';
import MealsSummary from './MealsSummary';


const Meals = () => {
    return (
        <Fragment>
            <MealsSummary />
            <ActiveMeals />
        </Fragment>
    );
};

export default Meals;