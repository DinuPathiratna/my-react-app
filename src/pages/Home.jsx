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

    </div>
  );
}