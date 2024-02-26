import MealItem from "./MealItem";
import useHttp from "../hooks/UseHttp";
import Error from "./Error";
const requestConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  console.log(loadedMeals);
  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Fetching meals....</p>;
  }
  if (error) {
    return <Error title="Failed to feach meals" message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

// import { useState, useEffect } from "react";

// import MealItem from "./MealItem.jsx";

// export default function Meals() {
//   const [loadedMeals, setLoadedMeals] = useState([]);

//   useEffect(() => {
//     async function fetchMeals() {
//       const response = await fetch("http://localhost:3000/meals");

//       if (!response.ok) {
//         // ...
//       }

//       const meals = await response.json();
//       setLoadedMeals(meals);
//     }

//     fetchMeals();
//   }, []);

//   return (
//     <ul id="meals">
//       {loadedMeals.map((meal) => (
//         <MealItem key={meal.id} meal={meal} />
//       ))}
//     </ul>
//   );
// }
