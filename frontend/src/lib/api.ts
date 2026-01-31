// API client for connecting to the backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Generic API request function
 */
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Contact API
 */
export const contactAPI = {
  // Submit contact form
  submit: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get contact information
  getInfo: async () => {
    return apiRequest('/contact');
  },
};

/**
 * Projects API
 */
export const projectsAPI = {
  // Get all projects
  getAll: async (filters?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured !== undefined)
      params.append('featured', String(filters.featured));
    if (filters?.limit) params.append('limit', String(filters.limit));

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest(`/projects${query}`);
  },

  // Get single project
  getOne: async (id: number) => {
    return apiRequest(`/projects/${id}`);
  },

  // Create project
  create: async (data: any) => {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update project
  update: async (id: number, data: any) => {
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete project
  delete: async (id: number) => {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Services API
 */
export const servicesAPI = {
  // Get all services (cache-bust so price updates show immediately)
  getAll: async () => {
    return apiRequest(`/services?_=${Date.now()}`);
  },
};

/**
 * Newsletter API
 */
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (data: { email: string; name?: string }) => {
    return apiRequest('/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Health Check API
 */
export const healthAPI = {
  // Check API health
  check: async () => {
    return apiRequest('/health');
  },
};

/**
 * Blogs API
 */
export const blogsAPI = {
  // Get all published blogs
  getAll: async (filters?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured !== undefined)
      params.append('featured', String(filters.featured));
    if (filters?.limit) params.append('limit', String(filters.limit));

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest(`/blogs${query}`);
  },

  // Get single blog by slug
  getOne: async (slug: string) => {
    return apiRequest(`/blogs/${slug}`);
  },
};

export default {
  contact: contactAPI,
  projects: projectsAPI,
  services: servicesAPI,
  newsletter: newsletterAPI,
  health: healthAPI,
  blogs: blogsAPI,
};

