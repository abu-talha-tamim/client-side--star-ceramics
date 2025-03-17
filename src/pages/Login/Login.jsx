import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login1 from "../../assets/Logo/Login.jpg";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hook/useAxiosPublic";

const Login = () => {
  const { signIn, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${result.user.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate(from);
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  const handleSocialLogin = async (providerFunction, platformName) => {
    try {
      const result = await providerFunction();
      const user = result?.user;
      if (!user || !user.email) {
        throw new Error(`${platformName} login failed. No user data received.`);
      }

      // Prepare user data
      const userInfo = {
        email: user.email,
        name: user.displayName || "Anonymous User",
        photo: user.photoURL || "default-photo-url",
        role: "Employee",
        salary: 0,
        bank_account_no: "N/A",
        designation: "N/A",
        registeredAt: new Date().toISOString(),
      };

      // Send user data to the database, avoid duplicate entry
      const response = await axiosPublic.post("/users", userInfo);
      if (response.data?.insertedId || response.data?.exists) {
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
        text: error.message || "An error occurred.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Star-T | Login</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-4 gap-8 p-16">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
            Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4 p-10">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Login
            </button>
          </form>

          <div className="space-y-4 mt-4">
            <button
              onClick={() => handleSocialLogin(signInWithGoogle, "Google")}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 py-2 rounded-full shadow-md transition"
            >
              <FcGoogle size={24} />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>

            <button
              onClick={() => handleSocialLogin(signInWithGithub, "GitHub")}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-full shadow-md transition hover:bg-gray-800"
            >
              <FaGithub size={24} />
              <span className="font-medium">Continue with GitHub</span>
            </button>
          </div>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>

        <div className="hidden md:block">
          <img
            src={login1}
            alt="Login Visual"
            className="rounded-lg shadow-lg w-[400px] h-[450px] object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
