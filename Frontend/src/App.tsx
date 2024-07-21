import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { auth } from "./config/firebase.init";
import { setLoading, setUser } from "./redux/features/auth/userSlice";
import { useAppDispatch } from "./redux/hook";
import router from "./routes/routes";

function App() {
  // dispatch
  const dispatch = useAppDispatch();

  // handle Auth State
  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <>
      {/* React Hot Toast */}
      <Toaster />

      {/* React Router */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
