import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs/featured")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Featured Jobs
          </h2>

          <p className="text-gray-500 mt-3">
            Explore our latest job opportunities
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading featured jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs posted yet. Register as a Recruiter to post jobs!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h3>

                <p className="text-blue-600 font-semibold mb-4">
                  {job.company}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {job.type}
                  </span>

                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {job.location}
                  </span>
                </div>

                <p className="text-gray-700 font-medium mb-5">
                  Salary: {job.salary}
                </p>

                <Link
                  to={`/jobs/${job._id}`}
                  className="block text-center w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                  View Details & Apply
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedJobs;