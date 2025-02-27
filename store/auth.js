import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

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
    async login(email, password, remember = false) {
      this.loading = true
      try {
        const { $api } = useNuxtApp()
        if (!$api) throw new Error('$api is not available')
        
        const response = await $api.post('/auth/login', { 
          email, 
          password,
          remember 
        })
        
        console.log('Login response:', response)
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
    
    // Add missing setAuthData method
    setAuthData(data) {
        console.log('Setting auth data:', data);
        this.user = data.user || null;
        this.token = data.token || null;
        
        if (this.token) {
          localStorage.setItem('auth_token', this.token);
        }
      }
  }
})