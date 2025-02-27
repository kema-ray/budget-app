import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: process.client ? JSON.parse(localStorage.getItem('auth_user')) || null : null,
    token: process.client ? localStorage.getItem('auth_token') || null : null,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email, password, remember = false) {
        this.loading = true
        try {
            const { $api } = useNuxtApp()
            const response = await $api.post('/auth/login', { email, password, remember })
            
            console.log('Login API Response:', response)
    
            this.setAuthData(response)
            return response
        } catch (error) {
            console.error('Login error:', error)
            throw error
        } finally {
            this.loading = false
        }
    },    
    
    async register(userData) {
      this.loading = true
      try {
        const { $api } = useNuxtApp()
        const response = await $api.post('/auth/register', userData)
        this.setAuthData(response)
        return response
      } catch (error) {
        console.error('Register error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
        try {
            const { $api } = useNuxtApp();
            await $api.post('/auth/logout'); // Adjust if API requires token
    
            this.clearAuthData();
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
    
    setAuthData(response) {
        console.log('Auth response:', response) // Debugging
    
        const authData = response.data // Extract data object
    
        this.user = authData || null
        this.token = authData.token || null
    
        if (process.client && this.token) {
            localStorage.setItem('auth_token', this.token)
        } else {
            console.warn('No token received or running on server!')
        }
    },
    
    clearAuthData() {
        this.token = null;
        this.user = null;
        if (process.client) {
            localStorage.removeItem('auth_token');
        }
    },
  }
})
