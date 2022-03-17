import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, addProject } from "../../firebase/firebase.config";
import "./add-project.styles.css"

function AddProject() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  let [projectName, setProjectName] = useState("");

 const createProject = async (name) => {
    if(name)
    addProject(name);
 }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div className="add-project">
      <div className="add-project__container">
        <input
          type="text"
          className="add-project__textBox"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Porject Name"
        />
        <button
          className="add-project__btn"
          onClick={() => createProject(projectName)}
        >
          Add Project
        </button>
        <button
          className="add-project__btn add-project__cancel"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddProject;
