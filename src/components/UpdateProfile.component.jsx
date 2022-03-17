import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  db,
  updateDisplayName,
  updateUserEmail,
  updateUserPassword,
} from "../firebase/firebase.config";
import "./updateProfile.styles.css";
function UpdateProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [errorText, setErrorText] = useState("");
  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      setDisplay("none");
      setErrorText("");
      setName(user.displayName);
      setEmail(user.email);
    } catch (err) {
      console.error(err);
      setDisplay("inline-block");
      return setErrorText("An error occured while fetching user data");
    }
  };

  async function updateProfileInfo() {
    try {
      setDisplay("none");
      setErrorText("");

      if (name && name !== user.displayName) updateDisplayName(name);
      if (email && email !== user.email) updateUserEmail(email);
      if (
        password &&
        confirmPassword &&
        password === confirmPassword &&
        password !== user.password
      ) {
        updateUserPassword(password);
      }
    } catch (err) {
      console.error(err);
      setDisplay("inline-block");
      return setErrorText("An error occured while fetching user data");
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserInfo();
  }, [user, loading]);

  return (
    <div className="update-profile">
      <div className="update-profile__container">
        <div style={{ display: display }} className="update-profile__error">
          <span>{errorText}</span>
        </div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="update-profile__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={name}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          className="update-profile__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="update-profile__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave blank to keep the same"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className="update-profile__textBox"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Leave blank to keep the same"
        />
        <button
          className="update-profile__btn"
          onClick={() => updateProfileInfo(name, email, password)}
        >
          Update Profile
        </button>
        <button
          className="update-profile__btn update-profile__cancel"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default UpdateProfile;
