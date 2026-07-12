import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">JobPortal</h3>
            <p className="text-gray-400">
              Your gateway to finding the perfect job opportunity.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@jobportal.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Job Street, Career City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
