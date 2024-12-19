import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { AuthTypes } from "@/context/authTypes";
import "./Login.scss";
import { useState } from "react";
import  { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { customToast } from "@/utils/functions/customToast";
import useTranslate from "@hooks/translations/Translate";
const Login = () => {
  const { login, isLoggedIn } = useAuth() as AuthTypes;
  const { translate } = useTranslate();

  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!credentials.email) {
        setErrors({ ...errors, email: true });
        return customToast("error", translate("complete_email_field"));
      }
      if (!credentials.password) {
        setErrors({ ...errors, password: true });
        return customToast("error", translate("complete_password_field"));
      }
      setLoading(true);
      await login(credentials.email, credentials.password);
      setLoading(false);
      navigate("/admin/orders");
    } catch (error: any) {
      customToast("error", error.response.data.message);
      setLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  if (isLoggedIn) return <Navigate to="/admin/orders" />;
  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <Toaster />
      <div className="cesar-img">
        <img
          src="/images/Cesar-logo.webp"
          alt="Cesar logo"
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && <div className="skeleton-img"></div>}
      </div>
      <form
        action=""
        className="login-form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          style={{ borderColor: errors.email ? "#e11d48" : "#f2f2f2" }}
          type="email"
          name="email"
          placeholder={translate("email")}
          onChange={(e) => {
            handleChange(e);
            if (e.target.value) setErrors({ ...errors, email: false });
          }}
        />
        <div
          className="password-input"
          style={{ borderColor: errors.password ? "#e11d48" : "#f2f2f2" }}
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={translate("password")}
            onChange={(e) => {
              handleChange(e);
              if (e.target.value) setErrors({ ...errors, password: false });
            }}
          />
          <button
            type="button"
            className="show-password"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        </div>
        <button className="login" type="submit">
          {loading ? <span className="loading"></span> : translate("login")}
        </button>
      </form>
    </motion.div>
  );
};

export default Login;
