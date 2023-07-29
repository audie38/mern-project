import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const BASE_API_URL = `${import.meta.env.VITE_API_BASE_URL}/menu/`;

const AvailableMeals = () => {
  const [menu, setMenu] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  const transformData = (menusObj) => {
    const data = menusObj?.data.map((menu) => {
      return {
        id: menu.id,
        name: menu.name,
        price: parseFloat(menu.price),
        description: menu.description,
      };
    });
    setMenu(data);
  };

  useEffect(() => {
    sendRequest(
      BASE_API_URL,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  }, [sendRequest]);

  const mealList = menu.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {error && <li>{error.message}</li>}
          {!error && isLoading && <li>Loading...</li>}
          {!error && !isLoading && mealList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
