import { useState, useEffect } from "react";
import api from "../api";

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

const auth = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

const getErr = (err, fallback) =>
  err.response?.data?.error?.message ||
  err.response?.data?.message ||
  err.message ||
  fallback;

function LoginScreen({ setLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogged, setKeepLogged] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      const { data } = await api.post("/login", { email, password });
      const token = data.access_token;

      (keepLogged ? localStorage : sessionStorage).setItem("token", token);
      setLogged(true);
    } catch (err) {
      setError(getErr(err, "Login failed"));
    }
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={keepLogged}
          onChange={(e) => setKeepLogged(e.target.checked)}
        />
        Keep me logged in
      </label>

      <br /><br />

      <button onClick={login}>Login</button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}
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
      const { data } = await api.get("/user", auth());
      setName(data.name || "");
      setDescription(data.description || "");
      setAvatar(data.avatar || "");
      setEmail(data.email || "");
    } catch (err) {
      console.error(err);
    }
  };

  const saveProfile = async () => {
    try {
      await api.put("/user", { name, description }, auth());
      alert("Profile Updated");
    } catch (err) {
      alert(getErr(err, "Update Failed"));
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return alert("Please select image");

    const fd = new FormData();
    fd.append("avatar", avatarFile);

    try {
      await api.post("/avatar", fd, {
        ...auth(),
        "Content-Type": "multipart/form-data"
      });

      alert("Avatar Updated");
      getUser();
    } catch (err) {
      alert(getErr(err, "Upload Failed"));
    }
  };

  const changePassword = async () => {
    setPasswordError("");

    try {
      await api.put(
        "/password",
        { old_password: currentPassword, new_password: newPassword },
        auth()
      );

      alert("Password Changed");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(getErr(err, "Password change failed"));
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout", {}, auth());
    } catch {}

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setLogged(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h3>Profile</h3>

      {avatar ? (
        <img src={avatar} width="120" />
      ) : (
        <p>No Profile Picture</p>
      )}

      <p>Email: {email}</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={saveProfile}>Save</button>

      <br /><br />

      <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />
      <button onClick={uploadAvatar}>Upload</button>

      <br /><br />

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <br /><br />

      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

      <button onClick={changePassword}>Change Password</button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Assignment_16() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(!!getToken());
  }, []);

  return logged ? (
    <ProfileScreen setLogged={setLogged} />
  ) : (
    <LoginScreen setLogged={setLogged} />
  );
}

export default Assignment_16;