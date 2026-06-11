import { useState, useEffect } from "react";
import api from "../api";

const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

function LoginScreen({ setLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogged, setKeepLogged] = useState(false);
  const [error, setError] = useState("");

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

      setLogged(true);
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

      <button onClick={login}>Login</button>

      <br />
      <br />

      {error && <p>{error}</p>}
    </div>
  );
}

function ProfileScreen({ setLogged }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const getUser = async () => {
    try {
      const userResponse = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setName(userResponse.data.name || "");
      setDescription(userResponse.data.description || "");
      setAvatar(userResponse.data.avatar || "");
      setEmail(userResponse.data.email || "");
    } catch (err) {
      console.error(err);
    }
  };

  const saveProfile = async () => {
    try {
      await api.put(
        "/user",
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert("Profile Updated");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      await api.post("/avatar", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Avatar Updated");
      getUser();
    } catch (err) {
      console.error(err);
      alert("Avatar Upload Failed");
    }
  };

  const changePassword = async () => {
    setPasswordError("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setPasswordError("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*\/\-@#$])[A-Za-z\d*\/\-@#$]{8,40}$/;

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be 8-40 chars with uppercase, lowercase, number and special character"
      );
      return;
    }

    try {
      await api.put(
        "/password",
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert("Password Changed");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setPasswordError("Password change failed");
    }
  };

  const logout = async () => {
    try {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h3>User Details</h3>

      {avatar ? (
        <img
          src={avatar}
          alt="Profile"
          width="120"
        />
      ) : (
        <p>No Profile Picture</p>
      )}

      <p>Email: {email}</p>

      <br />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}/>

      <br />
      <br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}/>

      <br />
      <br />

      <button onClick={saveProfile}>Save</button>

      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatarFile(e.target.files[0])}/>

      <button onClick={uploadAvatar}>Upload Avatar</button>

      <br />
      <br />

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) =>
          setCurrentPassword(e.target.value)
        }/>

      <br />
      <br />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(e.target.value)
        }/>

      <br />
      <br />

      <input
        type="password"
        placeholder="Re-Enter New Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
      />

      <br />
      <br />

      {passwordError && (
        <p>{passwordError}</p>
      )}

      <button onClick={changePassword}> Change Password</button>

      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Assignment_16() {
  const [logged, setLogged] = useState(
    getToken() !== null
  );

  return (
    <div>
      {logged ? (
        <ProfileScreen
          setLogged={setLogged}
        />
      ) : (
        <LoginScreen
          setLogged={setLogged}
        />
      )}
    </div>
  );
}

export default Assignment_16;