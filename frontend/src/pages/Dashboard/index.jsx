import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { jobsAPI } from '../../api/jobs.api';
import { applicationsAPI } from '../../api/applications.api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  // Fetch jobs for employers
  const { data: myJobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['myJobs'],
    queryFn: () => jobsAPI.getMyJobs().then((res) => res.data),
    enabled: user?.role === 'employer',
  });

  // Fetch applications for jobseekers
  const { data: myApplications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['myApplications'],
    queryFn: () => applicationsAPI.getMyApplications().then((res) => res.data),
    enabled: user?.role === 'jobseeker',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name}! You are logged in as{' '}
          <span className="font-semibold capitalize">{user?.role}</span>
        </p>
      </div>

      {user?.role === 'employer' ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Posted Jobs</h2>
            <Link
              to="/jobs/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post New Job
            </Link>
          </div>

          {jobsLoading ? (
            <p className="text-gray-600">Loading your jobs...</p>
          ) : myJobs && myJobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{job.location}</span>
                    <span className="font-semibold text-green-600">
                      ${job.salary}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/jobs/${job._id}/edit`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
                    >
                      Edit
                    </Link>
                    <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
              <Link
                to="/jobs/create"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">My Applications</h2>

          {applicationsLoading ? (
            <p className="text-gray-600">Loading your applications...</p>
          ) : myApplications && myApplications.length > 0 ? (
            <div className="grid gap-4">
              {myApplications.map((application) => (
                <div
                  key={application._id}
                  className="bg-white border rounded-lg p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {application.job?.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {application.job?.company || 'Company'}
                      </p>
                      <p className="text-gray-600 mb-2">
                        {application.job?.location}
                      </p>
                      <p className="text-gray-600">
                        Salary: ${application.job?.salary}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        application.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : application.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {application.status?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Applied on:{' '}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't applied to any jobs yet.</p>
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
