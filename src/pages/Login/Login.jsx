import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import login1 from "../../assets/Logo/Login.jpg";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-4 gap-8">
      {/* Login Form Card */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>
        {/* Divider */}
        
        {/* Google Login Button */}
        <div>
          <button className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 py-2 rounded-lg">
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </div>
        {/* Redirect to Register */}
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
      {/* Image Section */}
      <div className="hidden md:block">
        <img
          src={login1}
          alt="Login Visual"
          className="rounded-lg shadow-lg max-w-md"
        />
      </div>
    </div>
  );
};

export default Login;
