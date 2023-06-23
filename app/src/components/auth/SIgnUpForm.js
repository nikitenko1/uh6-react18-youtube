import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { BiHide, BiShow } from "react-icons/bi";
import { addUser } from "../../redux/slice/authSlice";
import setAuthToken from "../../utils/setAuthToken";
import { getUserInfoApi, registerUserApi } from "../../api/authApi";
import Loading from "../loading/Loading";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      comfirm_password: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      try {
        const res = await registerUserApi(value);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setAuthToken(res.data.token);
          const userInfo = await getUserInfoApi();
          dispatch(addUser(userInfo.data.user));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setLoading(false);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("This field is required!")
        .min(6, "Name must have at least 6 characters!")
        .max(20, "Name cannot exceed 20 characters!"),
      email: Yup.string()
        .required("This field is required!")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email invalidate!"
        ),
      password: Yup.string()
        .max(10, "Password cannot exceed 10 characters!")
        .required("This field is required!")
        .min(6, "Password must have at least 6 characters!"),
      comfirm_password: Yup.string()
        .required("This field is required!")
        .oneOf([Yup.ref("password"), null], "Password does not match!"),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[500px] bg-[#222] rounded-md p-4 max-w-[calc(100%-16px)]"
    >
      <h1 className="text-[20px] font-semibold">Sign Up</h1>
      <div className="w-full mt-4">
        <div className="w-full mb-4">
          <label className="block my-2 text-[16px]">Enter your name</label>
          <input
            placeholder="EX: Ivan Lendl"
            className="bg-[#333] text-white py-1 px-3 w-full text-[16px] outline-none rounded-sm"
            value={formik.name}
            name="name"
            onChange={formik.handleChange}
          />
          {formik.errors.name && <p className="text-xs text-red-500 mt-2">{formik.errors.name}</p>}
        </div>
        <div className="w-full mb-4">
          <label className="block my-2 text-[16px]">Enter your email</label>
          <input
            placeholder="EX: example12345678@gmail.com"
            className="bg-[#333] text-white py-1 px-3 w-full text-[16px] outline-none rounded-sm"
            value={formik.email}
            name="email"
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="text-xs text-red-500 mt-2">{formik.errors.email}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block my-2 text-[16px]">Enter your password</label>
          <div className="relative">
            <input
              placeholder="EX: 12345678"
              className="bg-[#333] text-white py-1 px-3 w-full text-[16px] outline-none rounded-sm"
              value={formik.password}
              name="password"
              onChange={formik.handleChange}
              type={showPass ? "text" : "password"}
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute top-[50%] translate-x-[-50%] translate-y-[-50%] right-0"
            >
              {showPass ? <BiHide className="text-2xl" /> : <BiShow className="text-2xl" />}
            </div>
          </div>
          {formik.errors.password && (
            <p className="text-xs text-red-500 mt-2">{formik.errors.password}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block my-2 text-[16px]">Enter your comfirm password</label>
          <input
            placeholder="EX: 12345678"
            className="bg-[#333] text-white py-1 px-3 w-full text-[16px] outline-none rounded-sm"
            value={formik.comfirm_password}
            name="comfirm_password"
            onChange={formik.handleChange}
            type={showPass ? "text" : "password"}
          />
          {formik.errors.comfirm_password && (
            <p className="text-xs text-red-500 mt-2">{formik.errors.comfirm_password}</p>
          )}
        </div>
        <div className="w-full">
          <button type="submit" className="py-2 px-3 bg-red-500 text-white rounded-sm w-full">
            Sign Up
          </button>
        </div>
        <p className="mt-4 text-right text-[14px]">
          If you already have an account please{" "}
          <Link className="text-blue-500" to="/sign-in">
            <p
              className="cursor-pointer border-[#bc13fe] text-white hover:border-b-2 inline-block
            transition-all"
            >
              Log In
            </p>
          </Link>
        </p>
      </div>
      <div className="border-t border-red-500 mt-4 pt-4">
        <button>
          <Link to="/">
            <p
              className="cursor-pointer border-[#bc13fe] text-xs capitalize text-white hover:border-b-2
            transition-all"
            >
              go back to the main page!
            </p>
          </Link>
        </button>
      </div>
      {loading && <Loading />}
    </form>
  );
};

export default SignUpForm;
