import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.style.css";
import { db, auth, logout } from "../firebase/firebase.config";
import { query, getDocs, collection, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  let [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserInfo = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.displayName);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserInfo();
  }, [user, loading]);
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__name">Logged in as {name}</div>
        <button
          className="dashboard__btn"
          onClick={() => navigate("/update-profile")}
        >
          Update Profile
        </button>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        <button
          className="dashboard__btn"
          onClick={() => navigate("/add-project")}
        >
          Add Project
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
