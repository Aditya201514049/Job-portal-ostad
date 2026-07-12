import { useQuery } from '@tanstack/react-query';
import { applicationsAPI } from '../../api/applications.api';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch applications
  const { data: applications, isLoading } = useQuery({
    queryKey: ['myApplications'],
    queryFn: () => applicationsAPI.getMyApplications().then((res) => res.data),
    enabled: isAuthenticated && user?.role === 'jobseeker',
  });

  // Redirect if not jobseeker
  if (isAuthenticated && user?.role !== 'jobseeker') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-50 border rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">This page is only for jobseekers.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Applications</h1>

      {isLoading ? (
        <p className="text-gray-600">Loading your applications...</p>
      ) : applications && applications.length > 0 ? (
        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {application.job?.title}
                  </h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Location: {application.job?.location}</p>
                    <p>Salary: ${application.job?.salary}</p>
                    <p>Job Type: <span className="capitalize">{application.job?.jobType}</span></p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
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

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Applied on: {new Date(application.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/jobs/${application.job?._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Job
                </Link>
              </div>
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
  );
};

export default MyApplications;
