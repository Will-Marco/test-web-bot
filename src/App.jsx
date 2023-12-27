import { getData } from "./constants/db.js";
import { Card } from "./components";
import "./App.css";

const courses = getData();

const App = () => {
  return (
    <>
      <h1 className="heading">All Courses</h1>
      {/* Cart */}
      <div className="cards__container">
        {courses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default App;
