import { useState, useEffect } from "react";
import axios from "axios";

function Assignment_12() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [keepLogged, setKeepLogged] = useState(false);

    const getUser = async (token) => {
        try {
            const userResponse = await axios.get(
                "https://auth.dnjs.lk/api/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("User Response:", userResponse.data);

            setUser(userResponse.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load user details");
        }
    };

    const login = async () => {
        setError("");

        try {
            const loginResponse = await axios.post(
                "https://auth.dnjs.lk/api/login",
                {
                    email,
                    password,
                }
            );

            console.log("Login Response:", loginResponse.data);

            const token = loginResponse.data.access_token;

            if (keepLogged) {
                localStorage.setItem("token", token);
            } else {
                sessionStorage.setItem("token", token);
            }

            getUser(token);
        } catch (err) {
            console.error(err);

            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong");
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        if (token) {
            getUser(token);
        }
    }, []);

    return (
        <div>
            {!user ? (
                <div>
                    <input
                        type="email"
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

                    <label>
                        <input
                            type="checkbox"
                            checked={keepLogged}
                            onChange={(e) =>
                                setKeepLogged(e.target.checked)
                            }
                        />
                        Keep me logged in
                    </label>

                    <br />
                    <br />

                    <button onClick={login}>Login</button>

                    <br />
                    <br />

                    {error && <p>{error}</p>}
                </div>
            ) : (
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

                    <button onClick={logout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Assignment_12;