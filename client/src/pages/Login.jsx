import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[75vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to CareerHub</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" required className="w-full p-2.5 border rounded"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="password" placeholder="Password" required className="w-full p-2.5 border rounded"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded font-semibold hover:bg-blue-700">
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;