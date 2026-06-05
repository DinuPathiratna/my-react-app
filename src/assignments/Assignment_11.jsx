import { useState } from "react";
import axios from "axios";

function Assignment_11() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const login = async () => {
        setError("");

        try {
            const loginResponse = await axios.post("https://auth.dnjs.lk/api/login",
                {
                    email,
                    password,
                });

            console.log("Login Response:", loginResponse.data);

            const token = loginResponse.data.access_token
            const userResponse = await axios.get("https://auth.dnjs.lk/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("User Response:", userResponse.data);

            setUser(userResponse.data);
        } catch (err) {
            console.error(err);

            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <div>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={login}>Login</button>

            <br /><br />

            {error && <p>{error}</p>}

            {user && (
                <div>
                    <h3>User Details</h3>

                    <img
                        src={user.profile_pic}
                        alt="Profile"
                        width="120"
                    />

                    <p>Name: {user.name}</p>
                    <p>Bio: {user.bio}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}

export default Assignment_11;