import { useState } from "react";
import { Button } from "../";
import "./Card.css";

const Card = ({ course, onAddItem, onRemoveItem }) => {
  const [count, setCount] = useState(0);

  const incrementHandle = () => {
    setCount((count) => count + 1);
    onAddItem(course);
  };

  const decrementHandle = () => {
    setCount((count) => count - 1);
    onRemoveItem(course);
  };

  return (
    <div className="card">
      <span className={`${count !== 0 ? "card__badge" : "card__badge-hidden"}`}>
        {count}
      </span>
      <div className="image__container">
        <img src={course.Image} alt={course.title} />
      </div>
      <div className="card__body">
        <h2 className="card__title">{course.title}</h2>
        <p className="card__price">
          {course.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <hr className="hr" />

      <div className="btn__container">
        <Button title={"+"} type={"add"} onClick={incrementHandle} />
        {count !== 0 && (
          <Button title={"-"} type={"remove"} onClick={decrementHandle} />
        )}
      </div>
    </div>
  );
};

export default Card;
