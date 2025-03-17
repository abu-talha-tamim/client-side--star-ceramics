import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Register1 from "../../assets/Logo/Register.jpg";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaGithub } from "react-icons/fa";
import useAxiosPublic from "../../hook/useAxiosPublic";

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
  const axiosPublic = useAxiosPublic();

  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data?.data?.url || "";
  };

  const handleSocialLogin = async (providerFunction, platformName) => {
    setLoading(true);
    try {
      const userCredential = await providerFunction();
      const user = userCredential?.user;
      if (!user || !user.email) {
        throw new Error("Missing user information");
      }
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

      const response = await axiosPublic.post("/users", userInfo);
      if (response.data?.insertedId) {
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
          text: response.data?.message || "Failed to store user data.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${platformName} Login Failed`,
        text: error.message || "An error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const photoURL = data.photo?.[0]
        ? await uploadImageToImgbb(data.photo[0])
        : "";
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
        bank_account_no: data.bank_account_no,
        salary: Number(data.salary),
        designation: data.designation,
        photo: photoURL,
        registeredAt: new Date().toISOString(),
      };

      const userCredential = await createUser(data.email, data.password);
      if (!userCredential) {
        throw new Error("User creation failed");
      }
      const response = await axiosPublic.post("/users", userData);
      if (!response.data?.insertedId) {
        throw new Error("Failed to insert user in database");
      }
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
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: error.message });
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
              <label htmlFor="role" className="block text-gray-700 font-medium">
                Role
              </label>
              <select
                {...register("role")}
                id="role"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
              </select>
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
                {...register("photo")}
                id="photo"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin(signInWithGoogle, "Google")}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 mt-4 hover:bg-gray-100"
            >
              <FcGoogle size={24} /> Sign up with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin(signInWithGithub, "GitHub")}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 mt-2 hover:bg-gray-100"
            >
              <FaGithub size={24} /> Sign up with GitHub
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
          </form>
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
