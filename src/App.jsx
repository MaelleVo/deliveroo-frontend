import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./assets/components/Header";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--q5cw8vtfqtbn.code.run/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <Header />
      <section>
        <article className="container">
          <div className="left-restaurant">
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>
          <div className="right-restaurant">
            <img src={data.restaurant.picture} alt="" />
          </div>
        </article>
      </section>
      <body className="body">
        <div className="container">
          <section className="left-section">
            <ul>
              {data.categories.map((category, index) => {
                return (
                  <>
                    <div key={index} className="categories">
                      <h3 key={index}>{category.name}</h3>
                      <div className="wrap">
                        {category.meals.map((meal, index) => {
                          return (
                            <>
                              <article className="article">
                                <div className="left-meal-description">
                                  <h4 key={index}>{meal.title}</h4>
                                  <p className="meal-description">
                                    {meal.description}
                                  </p>
                                  <p className="price">{meal.price} €</p>
                                </div>
                                <div>
                                  <img src={meal.picture} alt="meals" />
                                </div>
                              </article>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
            </ul>
          </section>
        </div>
      </body>
    </div>
  );
};

export default App;
