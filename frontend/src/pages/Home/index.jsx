import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { jobsAPI } from '../../api/jobs.api';

const Home = () => {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobsAPI.getAllJobs().then((res) => res.data),
  });

  const latestJobs = jobs?.slice(0, 6) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Find Your Dream Job Today</h1>
          <p className="text-xl mb-8 text-blue-100">
            Connect with top employers and discover opportunities that match your skills and ambitions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/jobs"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              Browse Jobs
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 border border-blue-400"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Job Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Job Listings</h2>
          {isLoading ? (
            <p className="text-center text-gray-600">Loading jobs...</p>
          ) : latestJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2 font-medium">{job.companyName}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Location:</span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Type:</span>
                      <span className="font-medium capitalize">{job.jobType}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Salary:</span>
                      <span className="font-semibold text-green-600">
                        ${job.salary}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No jobs available at the moment.</p>
          )}
          <div className="text-center mt-8">
            <Link
              to="/jobs"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Job Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Software Development', icon: '💻', count: '500+' },
              { name: 'Marketing', icon: '📈', count: '300+' },
              { name: 'Design', icon: '🎨', count: '200+' },
              { name: 'Sales', icon: '💼', count: '400+' },
              { name: 'Finance', icon: '💰', count: '250+' },
              { name: 'Healthcare', icon: '🏥', count: '350+' },
              { name: 'Education', icon: '📚', count: '150+' },
              { name: 'Engineering', icon: '⚙️', count: '450+' },
            ].map((category) => (
              <Link
                key={category.name}
                to="/jobs"
                className="bg-white border rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} jobs</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose JobPortal?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">For Job Seekers</h3>
              <p className="text-gray-600">Browse thousands of jobs, apply with one click, and track your applications all in one place.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">For Employers</h3>
              <p className="text-gray-600">Post jobs, manage applications, and find the perfect candidates for your organization.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast & Easy</h3>
              <p className="text-gray-600">Simple interface, quick application process, and instant notifications for updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <p className="text-blue-100">Active Jobs</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">Job Seekers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5K+</div>
              <p className="text-blue-100">Companies</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100K+</div>
              <p className="text-blue-100">Applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Join thousands of job seekers and employers already using JobPortal.</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Sign Up Free
            </Link>
            <Link
              to="/about"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
