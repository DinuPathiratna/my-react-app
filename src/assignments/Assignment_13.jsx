import { useState, useEffect } from "react";
import axios from "axios";

function LoginScreen({ setLogged, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLogged, setKeepLogged] = useState(false);
    const [error, setError] = useState("");

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

console.log(userResponse.data);
            setUser(userResponse.data);
            setLogged(true);
        } catch (err) {
            console.error(err);
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

    return (
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
    );
}

function ProfileScreen({ user, setLogged }) {
    const logout = async () => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        try {
            await axios.post(
                "https://auth.dnjs.lk/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (err) {
            console.error(err);
        }

        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        setLogged(false);
    };

    return (
        <div>
            <h3>User Details</h3>

            {user.avatar ? (
                <img
                    src={user.avatar}
                    alt="Profile"
                    width="120"
                />
            ) : (
                <p>No Profile Picture</p>
            )}

            <p>Name: {user.name}</p>
            <p>Description: {user.description || "No Description"}</p>
            <p>Email: {user.email}</p>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

function Assignment_13() {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        if (!token) return;

        const getUser = async () => {
            try {
                const userResponse = await axios.get(
                    "https://auth.dnjs.lk/api/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(userResponse.data);
                setLogged(true);
            } catch (err) {
                console.error(err);
            }
        };

        getUser();
    }, []);

    return (
        <div>
            {logged ? (
                <ProfileScreen
                    user={user}
                    setLogged={setLogged}
                />
            ) : (
                <LoginScreen
                    setLogged={setLogged}
                    setUser={setUser}
                />
            )}
        </div>
    );
}
export default Assignment_13;