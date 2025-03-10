import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Register1 from "../../assets/Logo/Register.jpg";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const bankAccount = form.bankAccount.value;
    const salary = form.salary.value;
    const designation = form.designation.value;
    const photoFile = form.photo.files[0];
    console.log(name, email, password, role, bankAccount, salary, designation, photoFile)  
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-4 gap-8">
      {/* Registration Form Card */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
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
          {/* Photo Upload Field */}
          <div>
            <label htmlFor="photo" className="block text-gray-700 font-medium">
              Upload Photo
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              className="mt-1 w-full"
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
              pattern="^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$"
              title="Password must be at least 6 characters long, contain at least one uppercase letter and one special character."
            />
            <p className="text-xs text-red-500 mt-1">
              Password must be at least 6 characters, include one capital letter
              and one special character.
            </p>
          </div>
          {/* Role Dropdown */}
          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
          </div>
          {/* Bank Account Field */}
          <div>
            <label
              htmlFor="bankAccount"
              className="block text-gray-700 font-medium"
            >
              Bank Account Number
            </label>
            <input
              type="text"
              name="bankAccount"
              id="bankAccount"
              placeholder="Enter your bank account number"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          {/* Salary Field */}
          <div>
            <label htmlFor="salary" className="block text-gray-700 font-medium">
              Salary
            </label>
            <input
              type="text"
              name="salary"
              id="salary"
              placeholder="Enter your salary"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          {/* Designation Field */}
          <div>
            <label
              htmlFor="designation"
              className="block text-gray-700 font-medium"
            >
              Designation
            </label>
            <input
              type="text"
              name="designation"
              id="designation"
              placeholder="Enter your designation (e.g., Sales Assistant)"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Register
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
        {/* Redirect to Login */}
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
      {/* Image Section */}
      <div className="hidden md:block">
        <img
          src={Register1}
          alt="Register Visual"
          className="rounded-lg shadow-lg max-w-md"
        />
      </div>
    </div>
  );
};

export default Register;
