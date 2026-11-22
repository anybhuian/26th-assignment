import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[75vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" required className="w-full p-2.5 border rounded"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="email" placeholder="Email" required className="w-full p-2.5 border rounded"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="password" placeholder="Password" required className="w-full p-2.5 border rounded"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <select className="w-full p-2.5 border rounded bg-white"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="user">Job Seeker (User)</option>
              <option value="recruiter">Recruiter (Employer)</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded font-semibold hover:bg-blue-700">
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;