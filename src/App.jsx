import { getData } from "./constants/db.js";
import "./App.css"

const courses = getData();

const App = () => {
  return (
    <>
      <h1>All Courses</h1>
      {/* Cart */}
      <div className="cards_container">
        {courses.map((course) => (
          <>
            <h3>{course.title}</h3>
          </>
        ))}
      </div>
    </>
  );
};

export default App;
