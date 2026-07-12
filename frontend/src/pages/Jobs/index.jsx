import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jobsAPI } from '../../api/jobs.api';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobsAPI.getAllJobs().then((res) => res.data),
  });

  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobTypeFilter ? job.jobType === jobTypeFilter : true;
    return matchesSearch && matchesType;
  }) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Jobs</h1>

      {/* Search and Filter */}
      <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              id="jobType"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      {isLoading ? (
        <p className="text-gray-600">Loading jobs...</p>
      ) : filteredJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {job.description}
              </p>
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
        <div className="bg-gray-50 border rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">
            {searchTerm || jobTypeFilter
              ? 'No jobs match your search criteria.'
              : 'No jobs available at the moment.'}
          </p>
          {(searchTerm || jobTypeFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setJobTypeFilter('');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
