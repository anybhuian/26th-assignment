import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting CareerHub! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600 mb-3">Contact Us</h1>
            <p className="text-gray-600">Have questions or feedback? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
              <p className="text-gray-600">
                Whether you are a job seeker needing support or a recruiter looking to hire top talent, reach out to us anytime.
              </p>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-bold text-gray-900">Office Address</h4>
                  <p className="text-sm text-gray-600">House 12, Road 5, Dhanmondi, Dhaka, Bangladesh</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Support</h4>
                  <p className="text-sm text-blue-600">support@careerhub.com</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone</h4>
                  <p className="text-sm text-gray-600">+880 1700-000000</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-blue-500"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-blue-500"
                />
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;