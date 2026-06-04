import { useState } from "react";
import axios from "axios";

function Assignment_10() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    try {
      const response = await axios.post(
        "https://auth.dnjs.lk/api/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Server connection failed");
      }
    }
  };

  return (
    <div>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={login}>Login</button>

      <br />

      {error && <p>{error}</p>}
    </div>
  );
}

export default Assignment_10;