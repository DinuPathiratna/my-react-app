import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">

      <Link to="/ASG-01">
        <button>Assignment 1</button>
      </Link>

      <br />

      <Link to="/ASG-02">
        <button>Assignment 2</button>
      </Link>

      <br />

      <Link to="/ASG-03">
        <button>Assignment 3</button>
      </Link>

      <br />

      <Link to="/ASG-04">
        <button>Assignment 4</button>
      </Link>
      <br />

      <Link to="/ASG-05">
        <button>Assignment 5</button>
      </Link>
      <br />

      <Link to="/ASG-06">
        <button>Assignment 6</button>
      </Link>
      <br />
      <Link to="/ASG-07">
        <button>Assignment 7</button>
      </Link>

    </div>
  );
}