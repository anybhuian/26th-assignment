function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">CareerHub</h2>
          <p className="text-sm">Your trusted platform to find dream jobs and hire top talents.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/jobs" className="hover:text-blue-400">All Jobs</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p className="text-sm">Email: support@careerhub.com</p>
          <p className="text-sm">Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} CareerHub. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;