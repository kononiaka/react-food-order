import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealsItem/MealItem';

import classes from './AvailableMeals.module.css';

const ActiveMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    useEffect(() => {
        const fetchMeals = async () => {
            const mealsArr = [];
            const response = await fetch('https://react-http-request-f29f6-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();
            for (let key in responseData) {
                mealsArr.push({
                    id: key,
                    description: responseData[key].description,
                    name: responseData[key].name,
                    price: responseData[key].price
                });
            }
            setMeals(mealsArr);
            setIsLoading(false);
        };
        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (httpError) {
        return <section className={classes.mealsError}>
            <p>{httpError}</p>
        </section>;
    }

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Is Loading...</p>
            </section>
        );
    }

    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />);
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default ActiveMeals;