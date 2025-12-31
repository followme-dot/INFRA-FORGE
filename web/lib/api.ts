/**
 * API Client para INFRA FORGE
 * Gestiona todas las llamadas al backend con autenticación JWT
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// ==================== Types ====================

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: {
    id: string
    name: string
    email: string
    role: 'admin' | 'developer' | 'analyst'
  }
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'developer' | 'analyst'
}

export interface Bot {
  id: string
  name: string
  type: 'grid' | 'dca' | 'arbitrage' | 'market-making'
  status: 'active' | 'paused' | 'stopped'
  exchange: string
  symbol: string
  profit: number
  trades: number
  created_at: string
  config: Record<string, any>
}

export interface BotCreate {
  config: {
    name: string
    type: string
    exchange: string
    symbol: string
    [key: string]: any
  }
  test_mode: boolean
}

// ==================== Token Management ====================

export const TokenManager = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  },

  setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('auth_token', token)
  },

  removeToken(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  },

  getUser(): User | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  setUser(user: User): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('user', JSON.stringify(user))
  }
}

// ==================== HTTP Client ====================

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = TokenManager.getToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expirado o inválido
        TokenManager.removeToken()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }

      const error = await response.json().catch(() => ({
        detail: 'An error occurred'
      }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

const api = new ApiClient(API_URL)

// ==================== Auth API ====================

export const AuthAPI = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // Mock login por ahora (en producción hacer llamada real al backend)
    // const response = await api.post<LoginResponse>('/api/auth/login', { email, password })

    // Simulación de respuesta
    const mockResponse: LoginResponse = {
      access_token: 'mock_jwt_token_' + Date.now(),
      token_type: 'bearer',
      user: {
        id: '1',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        role: email.includes('admin') ? 'admin' : 'developer'
      }
    }

    TokenManager.setToken(mockResponse.access_token)
    TokenManager.setUser(mockResponse.user)

    return mockResponse
  },

  async logout(): Promise<void> {
    TokenManager.removeToken()
    // await api.post('/api/auth/logout')
  },

  async getMe(): Promise<User> {
    const user = TokenManager.getUser()
    if (!user) throw new Error('Not authenticated')
    return user
    // return api.get<User>('/api/auth/me')
  },

  isAuthenticated(): boolean {
    return !!TokenManager.getToken()
  }
}

// ==================== Bots API ====================

export const BotsAPI = {
  async getAll(): Promise<Bot[]> {
    return api.get<Bot[]>('/api/bots')
  },

  async getById(id: string): Promise<Bot> {
    return api.get<Bot>(`/api/bots/${id}`)
  },

  async create(botData: BotCreate): Promise<Bot> {
    return api.post<Bot>('/api/bots', botData)
  },

  async start(id: string): Promise<{ message: string; status: string }> {
    return api.post(`/api/bots/${id}/start`)
  },

  async pause(id: string): Promise<{ message: string; status: string }> {
    return api.post(`/api/bots/${id}/pause`)
  },

  async stop(id: string): Promise<{ message: string; status: string }> {
    return api.post(`/api/bots/${id}/stop`)
  },

  async delete(id: string): Promise<{ message: string }> {
    return api.delete(`/api/bots/${id}`)
  },

  async getPerformance(id: string): Promise<any> {
    return api.get(`/api/bots/${id}/performance`)
  },

  async backtest(
    id: string,
    startDate: string,
    endDate: string,
    initialBalance: number = 10000
  ): Promise<any> {
    return api.post(`/api/bots/${id}/backtest`, {
      start_date: startDate,
      end_date: endDate,
      initial_balance: initialBalance
    })
  },

  async getAnalyticsOverview(): Promise<any> {
    return api.get('/api/bots/analytics/overview')
  }
}

// ==================== Contracts API ====================

export const ContractsAPI = {
  async getAll(): Promise<any[]> {
    return api.get('/api/contracts')
  },

  async create(contractData: any): Promise<any> {
    return api.post('/api/contracts', contractData)
  }
}

// ==================== Health Check ====================

export const HealthAPI = {
  async check(): Promise<{ status: string; service: string; version: string }> {
    return api.get('/health')
  }
}

// ==================== Chat API ====================

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  message: ChatMessage
  timestamp: string
}

export const ChatAPI = {
  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    return api.post<ChatResponse>('/api/chat/message', {
      messages,
      stream: false
    })
  },

  async analyzeContract(code: string): Promise<any> {
    return api.post<any>('/api/chat/analyze-contract', { code })
  }
}

export default api
