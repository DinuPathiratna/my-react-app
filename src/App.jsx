import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Assignment_1 from "./assignments/Assignment_1";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/ASG-01"
        element={<Assignment_1 />}
      />
    </Routes>
  );
}