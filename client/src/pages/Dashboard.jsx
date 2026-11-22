import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const { user, token, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [myApps, setMyApps] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [profile, setProfile] = useState({ name: user?.name || "", skills: user?.skills || "", bio: user?.bio || "" });
  const [newJob, setNewJob] = useState({ title: "", company: "", location: "", type: "Full Time", salary: "", description: "", requirements: "" });
  const [editingJobId, setEditingJobId] = useState(null);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "user") {
      axios.get("http://localhost:5000/api/applications/my", authHeader).then((res) => setMyApps(res.data));
    } else if (user.role === "recruiter") {
      fetchPostedJobs();
    }
  }, [user]);

  const fetchPostedJobs = () => {
    axios.get("http://localhost:5000/api/my-posted-jobs", authHeader).then((res) => setPostedJobs(res.data));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put("http://localhost:5000/api/users/profile", profile, authHeader);
    updateUser(res.data);
    alert("Profile Updated!");
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (editingJobId) {
      await axios.put(`http://localhost:5000/api/jobs/${editingJobId}`, newJob, authHeader);
      setEditingJobId(null);
    } else {
      await axios.post("http://localhost:5000/api/jobs", newJob, authHeader);
    }
    setNewJob({ title: "", company: "", location: "", type: "Full Time", salary: "", description: "", requirements: "" });
    fetchPostedJobs();
    alert("Saved successfully!");
  };

  const handleDeleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`, authHeader);
    fetchPostedJobs();
  };

  const handleEditClick = (job) => {
    setEditingJobId(job._id);
    setNewJob({ title: job.title, company: job.company, location: job.location, type: job.type, salary: job.salary, description: job.description, requirements: job.requirements });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[75vh] bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard ({user?.role?.toUpperCase()})</h1>

          {/* Profile Update Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Name" className="p-2 border rounded" />
              <input type="text" value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} placeholder="Skills (e.g. React, Node)" className="p-2 border rounded" />
              <input type="text" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Short Bio" className="p-2 border rounded" />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700">Save Profile</button>
            </form>
          </div>

          {/* USER VIEW: Applied Jobs */}
          {user?.role === "user" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">My Applied Jobs ({myApps.length})</h2>
              {myApps.length === 0 ? (
                <p className="text-gray-500">You haven't applied to any jobs yet.</p>
              ) : (
                myApps.map((app) => (
                  <div key={app._id} className="border-b py-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800">{app.job?.title}</h3>
                      <p className="text-sm text-gray-600">{app.job?.company} - {app.job?.location}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold">Applied</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* RECRUITER VIEW: Post & Manage Jobs */}
          {user?.role === "recruiter" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">{editingJobId ? "Edit Job" : "Post a New Job"}</h2>
                <form onSubmit={handleJobSubmit} className="space-y-3">
                  <input type="text" placeholder="Job Title" required value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} className="w-full p-2 border rounded" />
                  <input type="text" placeholder="Company Name" required value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} className="w-full p-2 border rounded" />
                  <input type="text" placeholder="Location (e.g. Remote, Dhaka)" required value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} className="w-full p-2 border rounded" />
                  <select value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} className="w-full p-2 border rounded bg-white">
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Remote">Remote</option>
                  </select>
                  <input type="text" placeholder="Salary (e.g. $1000/mo)" required value={newJob.salary} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} className="w-full p-2 border rounded" />
                  <textarea placeholder="Job Description" required value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="w-full p-2 border rounded" />
                  <textarea placeholder="Requirements" required value={newJob.requirements} onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })} className="w-full p-2 border rounded" />
                  <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded font-semibold hover:bg-blue-700">
                    {editingJobId ? "Update Job" : "Post Job"}
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">My Posted Jobs ({postedJobs.length})</h2>
                {postedJobs.length === 0 ? (
                  <p className="text-gray-500">No jobs posted yet.</p>
                ) : (
                  postedJobs.map((job) => (
                    <div key={job._id} className="border-b py-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-800">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company} • {job.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(job)} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Edit</button>
                        <button onClick={() => handleDeleteJob(job._id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;