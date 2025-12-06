// Admin API client for connecting to admin endpoints

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('adminToken');
};

// Generic API request function for admin routes
async function adminRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getToken();
  const url = `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - remove token and redirect to login
        removeAuthToken();
        window.location.href = '/admin/login';
      }
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Admin Auth API
 */
export const adminAuthAPI = {
  login: async (username: string, password: string) => {
    const response = await adminRequest('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await adminRequest('/admin/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  getMe: async () => {
    const response = await adminRequest('/admin/auth/me');
    return response;
  },

  logout: () => {
    removeAuthToken();
  },
};

/**
 * Admin Dashboard API
 */
export const adminDashboardAPI = {
  getStats: async () => {
    return adminRequest('/admin/dashboard/stats');
  },
};

/**
 * Admin Contacts API
 */
export const adminContactsAPI = {
  getAll: async (page = 1, limit = 10, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    return adminRequest(`/admin/contacts?${params.toString()}`);
  },

  getOne: async (id: string) => {
    return adminRequest(`/admin/contacts/${id}`);
  },

  delete: async (id: string) => {
    return adminRequest(`/admin/contacts/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return adminRequest('/admin/contacts/stats/overview');
  },
};

/**
 * Admin Projects API
 */
export const adminProjectsAPI = {
  getAll: async (filters?: any) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return adminRequest(`/admin/projects${query}`);
  },

  getOne: async (id: string) => {
    return adminRequest(`/admin/projects/${id}`);
  },

  create: async (data: any) => {
    return adminRequest('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return adminRequest(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return adminRequest(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Admin Subscribers API
 */
export const adminSubscribersAPI = {
  getAll: async (page = 1, limit = 10, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    return adminRequest(`/admin/subscribers?${params.toString()}`);
  },

  delete: async (id: string) => {
    return adminRequest(`/admin/subscribers/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return adminRequest('/admin/subscribers/stats/overview');
  },
};

/**
 * Admin Upload API
 */
export const adminUploadAPI = {
  uploadSingle: async (formData: FormData) => {
    const token = getToken();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    const response = await fetch(`${API_URL}/admin/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/admin/login';
      }
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  },

  uploadMultiple: async (formData: FormData) => {
    const token = getToken();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    const response = await fetch(`${API_URL}/admin/upload/multiple`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/admin/login';
      }
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  },

  delete: async (publicId: string) => {
    return adminRequest(`/admin/upload/${publicId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Admin Profile API
 */
export const adminProfileAPI = {
  get: async () => {
    return adminRequest('/admin/profile');
  },

  update: async (data: any) => {
    return adminRequest('/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deletePicture: async () => {
    return adminRequest('/admin/profile/picture', {
      method: 'DELETE',
    });
  },
};

/**
 * Admin Admins API (Superadmin only)
 */
export const adminAdminsAPI = {
  getAll: async (page = 1, limit = 10, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    return adminRequest(`/admin/admins?${params.toString()}`);
  },

  getOne: async (id: string) => {
    return adminRequest(`/admin/admins/${id}`);
  },

  create: async (data: any) => {
    return adminRequest('/admin/admins', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return adminRequest(`/admin/admins/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return adminRequest(`/admin/admins/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return adminRequest('/admin/admins/stats/overview');
  },
};

export default {
  auth: adminAuthAPI,
  dashboard: adminDashboardAPI,
  contacts: adminContactsAPI,
  projects: adminProjectsAPI,
  subscribers: adminSubscribersAPI,
  upload: adminUploadAPI,
  admins: adminAdminsAPI,
  profile: adminProfileAPI,
};

