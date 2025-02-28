import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userDetails: null,
    loading: false,
  }),
  
  getters: {
    isAuthenticated: (state) => {
      return state.userDetails !== null
    },
  },
  
  actions: {
    setUserDetails(userDetails) {
      if (!userDetails) {
        console.error('setUserDetails received undefined!');
        return;
      }
      console.log('Setting user details:', userDetails);
      this.userDetails = userDetails;
      
      // Persist user details in localStorage
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    },
    
    clearUserDetails() {
      this.userDetails = null;
      // Remove from localStorage
      localStorage.removeItem('userDetails');
    },
    
    // Initialize store with saved data
    initializeAuth() {
      const savedUserDetails = localStorage.getItem('userDetails');
      if (savedUserDetails) {
        try {
          this.userDetails = JSON.parse(savedUserDetails);
        } catch (error) {
          console.error('Failed to parse saved user details:', error);
          localStorage.removeItem('userDetails');
        }
      }
    }
  }
})