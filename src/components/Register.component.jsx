import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase.config";
import "./Register.style.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [errorText, setErrorText] = useState("");
  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();
  const register = () => {
    if (!name) 
    {
      setDisplay("inline-block")
      setErrorText("Please enter a name")
      return 
    }
    else if(!email) {
      setDisplay("inline-block")
      setErrorText("Please enter an email")
      return
    }
    else if (password !== confirmPassword) {
      setDisplay("inline-block")
      setErrorText("Passwords do not match")
      return
    }
    else if (!password || !confirmPassword) {
      setDisplay("inline-block")
      setErrorText("Please enter a password")
      return
    }
    setDisplay("none")
    setErrorText("");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="register">
      <div className="register__container">
        <div style={{display: display}} className="register__error">
          <span>{errorText}</span>
        </div>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          className="register__textBox"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button disabled={loading} className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
