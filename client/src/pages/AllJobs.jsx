import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-3">
            All Jobs
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Explore all available job opportunities.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-10">
            <input
              type="text"
              placeholder="Search by job title, company, or location..."
              className="w-full p-3 border rounded-lg shadow-sm bg-white focus:outline-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Job Cards */}
          {loading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition border"
                >
                  <h2 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-blue-600 font-medium mt-1">
                    {job.company}
                  </p>
                  <div className="flex gap-2 mt-3 text-xs">
                    <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded">
                      {job.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                      {job.location}
                    </span>
                  </div>
                  <p className="text-gray-600 font-semibold mt-4">
                    Salary: {job.salary}
                  </p>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="inline-block mt-4 w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AllJobs;