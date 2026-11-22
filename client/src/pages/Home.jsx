
import Navbar from "../components/Navbar";
import FeaturedJobs from "../components/FeaturedJobs";

function Home() {
  return (
    <>
      <Navbar />

      <section className="bg-blue-50 min-h-[550px] flex items-center justify-center px-6">
        <div className="max-w-4xl w-full text-center">

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-blue-600">Dream Job</span>
            <br />
            Today!
          </h1>

          <p className="text-gray-600 text-lg mb-10">
            Discover thousands of job opportunities and build
            your successful career with CareerHub.
          </p>

          <div className="bg-white p-3 rounded-xl shadow-lg flex flex-col md:flex-row gap-3">

            <input
              placeholder="Job title or keywords"
              className="flex-1 p-4 border rounded-lg"
            />

            <input
              placeholder="Location"
              className="flex-1 p-4 border rounded-lg"
            />

            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg">
              Search Jobs
            </button>

          </div>
        </div>
      </section>

      <FeaturedJobs />
    </>
  );
}

export default Home;
