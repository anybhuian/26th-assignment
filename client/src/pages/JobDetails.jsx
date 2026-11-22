import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    try {
      await axios.post(
        "http://localhost:5000/api/applications",
        { jobId: id, resumeLink, coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Application submitted successfully!");
      setResumeLink("");
      setCoverLetter("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[75vh] bg-gray-50 py-10 px-4">
        {!job ? (
          <p className="text-center mt-10">Loading...</p>
        ) : (
          <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-blue-600 font-semibold text-lg mt-1">{job.company} • {job.location}</p>
            <div className="flex gap-4 mt-3 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">{job.type}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded">Salary: {job.salary}</span>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-lg text-gray-800">Job Description</h3>
              <p className="text-gray-700 mt-2 whitespace-pre-line">{job.description}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-lg text-gray-800">Requirements</h3>
              <p className="text-gray-700 mt-2 whitespace-pre-line">{job.requirements}</p>
            </div>

            {user?.role === "user" ? (
              <form onSubmit={handleApply} className="mt-8 border-t pt-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Apply for this position</h3>
                <input type="url" placeholder="Google Drive / Portfolio Resume Link" required
                  className="w-full p-2.5 border rounded" value={resumeLink} onChange={(e) => setResumeLink(e.target.value)} />
                <textarea placeholder="Cover Letter (Optional)" className="w-full p-2.5 border rounded"
                  value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded font-semibold hover:bg-blue-700">
                  Submit Application
                </button>
              </form>
            ) : !user ? (
              <div className="mt-8 border-t pt-6">
                <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-6 py-2.5 rounded font-semibold">
                  Login as Job Seeker to Apply
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default JobDetails;