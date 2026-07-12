import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { usersAPI } from '../../api/users.api';
import { useAuth } from '../../context/AuthContext';
import useAuthStore from '../../store/authStore';

const Profile = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  // Fetch profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => usersAPI.getProfile().then((res) => res.data),
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data) => usersAPI.updateProfile(data),
    onSuccess: (response) => {
      // Update auth store with new profile data
      useAuthStore.getState().updateUser(response.data);
      alert('Profile updated successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to update profile');
    },
  });

  // Update form when profile data loads
  useEffect(() => {
    if (profile && !isLoading) {
      reset({
        name: profile.name,
        email: profile.email,
      });
    }
  }, [profile, isLoading, reset]);

  const onSubmit = async (data) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        {isLoading ? (
          <p className="text-gray-600">Loading profile...</p>
        ) : (
          <div className="bg-white border rounded-lg p-8 shadow-sm">
            <div className="mb-6 pb-6 border-b">
              <h2 className="text-xl font-semibold mb-2">Account Information</h2>
              <p className="text-gray-600">Role: <span className="font-semibold capitalize">{profile?.role || user?.role}</span></p>
              <p className="text-gray-600">Member since: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  disabled
                />
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || updateProfileMutation.isPending}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting || updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
