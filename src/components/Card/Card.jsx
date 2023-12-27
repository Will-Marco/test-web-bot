import "./Card.css";

const Card = ({ course }) => {
  return (
    <div className="card">
      <span className="card__badge">1</span>
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
        <button>+</button>
        <button>-</button>
      </div>
    </div>
  );
};

export default Card;
