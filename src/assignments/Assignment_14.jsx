import { useState, useEffect } from "react";
import api from "../api";

function LoginScreen({ setLogged, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLogged, setKeepLogged] = useState(false);
    const [error, setError] = useState("");

    const getUser = async (token) => {
        try {
            const userResponse = await api.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(userResponse.data);
            setLogged(true);
        } catch (err) {
            console.error(err);
        }
    };

    const login = async () => {
        setError("");

        try {
            const loginResponse = await api.post("/login", {
                email,
                password,
            });

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
                    onChange={(e) => setKeepLogged(e.target.checked)}
                />
                Keep me logged in
            </label>

            <br />
            <br />

            <button onClick={login}>
                Login
            </button>

            <br />
            <br />

            {error && <p>{error}</p>}
        </div>
    );
}

function ProfileScreen({ user, setUser, setLogged }) {
    const [name, setName] = useState(user.name || "");
    const [description, setDescription] = useState(
        user.description || ""
    );

    const saveProfile = async () => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        try {
            await api.put(
                "/user",
                {
                    name,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser({
                ...user,
                name,
                description,
            });

            alert("Profile Updated");
        } catch (err) {
            console.error(err);
            alert("Update Failed");
        }
    };

    const logout = async () => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        try {
            await api.post(
                "/logout",
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

            <p>Email: {user.email}</p>

            <br />

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <br />
            <br />

            <button onClick={saveProfile}>
                Save
            </button>

            <br />
            <br />

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

function Assignment_14() {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        if (!token) return;

        const getUser = async () => {
            try {
                const userResponse = await api.get("/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
                    setUser={setUser}
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

export default Assignment_14;