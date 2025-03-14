import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Register1 from "../../assets/Logo/Register.jpg";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Google Login Successful",
        text: `Welcome, ${result.user?.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithGithub();
      Swal.fire({
        icon: "success",
        title: "GitHub Login Successful",
        text: `Welcome, ${result.user?.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "GitHub Login Failed",
        text: error.message,
      });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      if (result?.user) {
        const photoURL = data.photo[0]
          ? URL.createObjectURL(data.photo[0])
          : "";
        await updateUserProfile(data.name, photoURL);
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Star | Register</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-4 gap-8">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
            Register
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                id="name"
                placeholder="Enter your name"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                id="email"
                placeholder="Enter your email"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-gray-700 font-medium"
              >
                Upload Photo
              </label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                id="photo"
                accept="image/*"
                className="mt-1 w-full"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm">{errors.photo.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/,
                    message:
                      "Password must be at least 6 characters, include one capital letter and one special character.",
                  },
                })}
                id="password"
                placeholder="Enter your password"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 hover:bg-blue-200 flex items-center justify-center py-2 mt-2 rounded-lg"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full border border-gray-300 hover:bg-gray-200 flex items-center justify-center py-2 mt-2 rounded-lg"
          >
            Continue with GitHub
          </button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
        <div className="hidden md:block">
          <img
            src={Register1}
            alt="Register Visual"
            className="rounded-lg shadow-lg max-w-md"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
