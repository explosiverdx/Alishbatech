import { useEffect, useState } from 'react';
import { adminProfileAPI, adminUploadAPI } from '../../lib/adminApi';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await adminProfileAPI.get();
      setProfile(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('image', file);

      const response = await adminUploadAPI.uploadSingle(formData);
      
      // Update profile with new image
      await adminProfileAPI.update({
        profilePicture: response.data.secure_url,
        cloudinaryPublicId: response.data.public_id,
      });

      setSuccess('Profile picture updated successfully!');
      loadProfile();
    } catch (error: any) {
      console.error('Upload failed:', error);
      setError('Failed to upload image: ' + (error.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePicture = async () => {
    if (!confirm('Are you sure you want to remove your profile picture?')) return;

    try {
      await adminProfileAPI.deletePicture();
      setSuccess('Profile picture removed successfully!');
      loadProfile();
    } catch (error: any) {
      console.error('Delete failed:', error);
      setError('Failed to remove profile picture');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const updates: any = {};
      
      if (formData.username !== profile.username) {
        updates.username = formData.username;
      }
      
      if (formData.email !== profile.email) {
        updates.email = formData.email;
      }
      
      if (formData.newPassword) {
        updates.currentPassword = formData.currentPassword;
        updates.newPassword = formData.newPassword;
      }

      if (Object.keys(updates).length === 0) {
        setError('No changes to save');
        return;
      }

      await adminProfileAPI.update(updates);
      setSuccess('Profile updated successfully!');
      
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      loadProfile();
    } catch (error: any) {
      console.error('Update failed:', error);
      setError(error.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and profile picture</p>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Profile Picture Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            {profile?.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt={profile.username}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-gray-200 dark:border-gray-700">
                <span className="text-white font-bold text-4xl">
                  {profile?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
              id="profile-picture-upload"
            />
            <label
              htmlFor="profile-picture-upload"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Picture'}
            </label>
            {profile?.profilePicture && (
              <button
                onClick={handleDeletePicture}
                className="ml-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Remove Picture
              </button>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              JPG, PNG or GIF. Max size 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                minLength={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    profile?.role === 'superadmin'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                  }`}
                >
                  {profile?.role}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Member Since
              </label>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                {new Date(profile?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Change Password</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Leave blank if you don't want to change your password
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    minLength={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    minLength={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

