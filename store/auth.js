// store/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  
  actions: {
    async login(credentials) {
      this.loading = true
      try {
        const { $api } = useNuxtApp()
        const response = await $api.post('/api/auth/login', credentials)
        this.setAuthData(response.data)
        return response.data
      } finally {
        this.loading = false
      }
    },
    
    async register(userData) {
      this.loading = true
      try {
        const { $api } = useNuxtApp()
        const response = await $api.post('/api/auth/register', userData)
        this.setAuthData(response.data)
        return response.data
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      try {
        const { $api } = useNuxtApp()
        await $api.post('/api/auth/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearAuthData()
      }
    },
    
    setAuthData(data) {
      this.token = data.token
      this.user = data.user
      // Store token in localStorage for persistence
      localStorage.setItem('token', data.token)
    },
    
    clearAuthData() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
    
    // Initialize auth state from localStorage
    init() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.fetchUser()
      }
    },
    
    async fetchUser() {
      try {
        const { $api } = useNuxtApp()
        const response = await $api.get('/api/auth/user')
        this.user = response.data
      } catch (error) {
        this.clearAuthData()
      }
    }
  }
})