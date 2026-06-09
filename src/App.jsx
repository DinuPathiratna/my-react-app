import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Assignment_1 from "./assignments/Assignment_1";
import Assignment_2 from "./assignments/Assignment_2";
import Assignment_3 from "./assignments/Assignment_3";
import Assignment_4 from "./assignments/Assignment_4";
import Assignment_5 from "./assignments/Assignment_5";
import Assignment_6 from "./assignments/Assignment_6";
import Assignment_7 from "./assignments/Assignment_7";
import Assignment_8 from "./assignments/Assignment_8";
import Assignment_9 from "./assignments/Assignment_9";
import Assignment_10 from "./assignments/Assignment_10";
import Assignment_11 from "./assignments/Assignment_11";
import Assignment_12 from "./assignments/Assignment_12";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/ASG-01" element={<Assignment_1 />} />
      <Route path="/ASG-02" element={<Assignment_2 />} />
      <Route path="/ASG-03" element={<Assignment_3 />} />
      <Route path="/ASG-04" element={<Assignment_4 />} />
      <Route path="/ASG-05" element={<Assignment_5 />} />
      <Route path="/ASG-06" element={<Assignment_6 />} />
      <Route path="/ASG-07" element={<Assignment_7 />} />
      <Route path="/ASG-08" element={<Assignment_8 />} />
      <Route path="/ASG-09" element={<Assignment_9 />} />
      <Route path="/ASG-10" element={<Assignment_10 />} />
      <Route path="/ASG-11" element={<Assignment_11 />} />
      <Route path="/ASG-12" element={<Assignment_12 />} />
    </Routes>
  );
}

