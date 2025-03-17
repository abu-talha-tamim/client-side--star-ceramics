import { useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";


const useSocialLogin = () => {
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (providerFunction, platformName) => {
    setLoading(true);
    try {
      const { user } = await providerFunction();
      if (!user?.email) throw new Error("No user data received");

      const userInfo = {
        email: user.email,
        name: user.displayName || "User",
        photo: user.photoURL || "",
        role: "Employee",
        registeredAt: new Date().toISOString(),
      };

      const { data } = await axiosPublic.post("/users", userInfo);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: `${platformName} Login Successful`,
          text: `Welcome, ${userInfo.name}!`,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(from);
      } else {
        Swal.fire({
          icon: "error",
          title: "Database Error",
          text: "Failed to store user data.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${platformName} Login Failed`,
        text: error.message || "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => handleSocialLogin(signInWithGoogle, "Google");
  const loginWithGithub = () => handleSocialLogin(signInWithGithub, "GitHub");

  return { loginWithGoogle, loginWithGithub, loading };
};

export default useSocialLogin;
