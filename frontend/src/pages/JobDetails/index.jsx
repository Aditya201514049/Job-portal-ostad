import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsAPI } from '../../api/jobs.api';
import { applicationsAPI } from '../../api/applications.api';
import { useAuth } from '../../context/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Fetch job details
  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsAPI.getJobById(id).then((res) => res.data),
    enabled: !!id,
  });

  // Apply to job mutation
  const applyMutation = useMutation({
    mutationFn: (jobId) => applicationsAPI.applyJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries(['myApplications']);
      alert('Application submitted successfully!');
      navigate('/my-applications');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to apply for job');
    },
  });

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'jobseeker') {
      alert('Only jobseekers can apply for jobs');
      return;
    }
    if (window.confirm('Are you sure you want to apply for this job?')) {
      applyMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Job not found</p>
        <Link to="/jobs" className="text-blue-600 hover:text-blue-700">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/jobs"
        className="inline-block text-blue-600 hover:text-blue-700 mb-6"
      >
        ← Back to Jobs
      </Link>

      <div className="bg-white border rounded-lg p-8 shadow-sm">
        <div className="mb-8 pb-6 border-b">
          <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {job.jobType}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              ${job.salary}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {job.location}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
        </div>

        <div className="mb-8 pb-6 border-b">
          <h2 className="text-2xl font-bold mb-4">Posted By</h2>
          {job.employer && (
            <div className="text-gray-700">
              <p className="font-semibold">{job.employer.name}</p>
              <p className="text-gray-600">{job.employer.email}</p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {user?.role === 'jobseeker' ? (
            <button
              onClick={handleApply}
              disabled={applyMutation.isPending}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-lg font-semibold"
            >
              {applyMutation.isPending ? 'Applying...' : 'Apply for this Job'}
            </button>
          ) : !isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 text-center text-lg font-semibold"
              >
                Login to Apply
              </Link>
              <Link
                to="/register"
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 text-center text-lg font-semibold"
              >
                Create Account
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
