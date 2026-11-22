import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold text-blue-600">
          CareerHub
        </Link>

        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/jobs" className="hover:text-blue-600">All Jobs</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          {user && (
            <Link to="/dashboard" className="text-blue-600 font-semibold hover:text-blue-700">
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-600 hidden sm:inline">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-blue-600 font-semibold">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;