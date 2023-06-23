import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { addUser, logOut } from "./redux/slice/authSlice";
import setAuthToken from "./utils/setAuthToken";
import { getUserInfoApi } from "./api/authApi";
import Loading from "./components/loading/Loading";
import Layouts from "./pages/Layouts";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";
import { getVideoHomePage } from "./redux/slice/infinityLoadSlice";

const App = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search, location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("token") === "null") {
      dispatch(logOut());
    } else {
      setAuthToken(localStorage.getItem("token"));
      (async () => {
        try {
          const res = await getUserInfoApi();
          if (res.data.success) {
            dispatch(addUser(res.data.user));
          }
        } catch (error) {
          dispatch(logOut());
        }
      })();
    }
  }, [dispatch]);

  if (typeof currentUser === "undefined") return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/*" element={<Layouts />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
