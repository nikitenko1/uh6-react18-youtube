import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Title from "../../components/shared/Title";
import SignInForm from "../../components/auth/SignInForm";
import { useSearchParams } from "../../hooks/useSearchParms";

const SignInPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();

  if (currentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div className="text-white py-4 w-full h-screen flex items-center justify-center">
      <Title title={"Sign-In | UA You - Video sharing website"} />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
