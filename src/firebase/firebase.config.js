import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDDdAnv82WmqCbaA1uhvW_7lCXxKjGvA-s",

  authDomain: "auto-project-planner.firebaseapp.com",

  projectId: "auto-project-planner",

  storageBucket: "auto-project-planner.appspot.com",

  messagingSenderId: "222564332865",

  appId: "1:222564332865:web:802a75cd9d61d795ac5dc0",

  measurementId: "G-3PR5JWH456",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let updateDisplayName;
let updateUserEmail;
let updateUserPassword;
let addProject;

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    const q = query(collection(db, "users"), where("uid", "==", auth.uid));
    const docs = await getDocs(q);
    console.log("called");
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: auth.uid,
        displayName: auth.displayName,
        authProvider: "google",
        email: auth.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (displayName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const getCurrentDoc = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const data = await getDocs(q);
      const docId = data.docs[0].id;
      const docRef = doc(db, "users", `${docId}`);
      return docRef;
    };


    updateDisplayName = async (name) => {
      user.displayName = name;
      try {
        await updateProfile(user, {
          displayName: user.displayName,
        });
        const docRef = await getCurrentDoc();
        console.log(docRef.id);
        await updateDoc(docRef, {
          displayName: name,
        });
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    updateUserEmail = async (email) => {
      try {
        await updateEmail(user, email);
        const docRef = await getCurrentDoc();
        await updateDoc(docRef, {
          email,
        });
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    updateUserPassword = async (newPassword) => {
      try {
        await updatePassword(user, newPassword);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    addProject = async (projectName) => {
      try {
        const docRef = await getCurrentDoc();
        await addDoc(collection(db, "users", `${docRef.id}`, "projects"), {
          name: projectName,
        });
      } catch (error) {
        console.error(error);
      }
    };

  } else {
    console.log("No user logged in.");
  }
});

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  updateDisplayName,
  updateUserEmail,
  sendPasswordReset,
  updateUserPassword,
  addProject,
  logout,
};
