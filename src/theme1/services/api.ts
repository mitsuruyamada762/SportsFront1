// API service configuration and utilities

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>
}

class ApiService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, ...requestConfig } = config
    
    // Build URL with query parameters
    const url = new URL(`${this.baseURL}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...requestConfig.headers,
    }

    try {
      const response = await fetch(url.toString(), {
        ...requestConfig,
        headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

// Create and export API service instance
export const apiService = new ApiService(API_BASE_URL)

// Example API functions
export const userApi = {
  getUsers: () => apiService.get('/users'),
  getUser: (id: string) => apiService.get(`/users/${id}`),
  createUser: (user: any) => apiService.post('/users', user),
  updateUser: (id: string, user: any) => apiService.put(`/users/${id}`, user),
  deleteUser: (id: string) => apiService.delete(`/users/${id}`),
}
