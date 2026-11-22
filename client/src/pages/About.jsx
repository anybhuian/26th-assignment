import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              About CareerHub
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Connecting talented professionals with top companies worldwide. We make job hunting and hiring simple, fast, and transparent.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to bridge the gap between job seekers and recruiters by providing an intuitive, reliable, and efficient career networking platform where every talent finds the right opportunity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Choose Us?</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Verified job listings from trusted companies</li>
                <li>One-click easy job application process</li>
                <li>Dedicated dashboard for Job Seekers & Recruiters</li>
                <li>100% free and transparent career portal</li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-blue-600 text-white rounded-xl p-8 grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
            <div>
              <h3 className="text-3xl font-bold">10,000+</h3>
              <p className="text-blue-100 mt-1">Active Job Seekers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">2,500+</h3>
              <p className="text-blue-100 mt-1">Jobs Posted</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-blue-100 mt-1">Top Companies</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;